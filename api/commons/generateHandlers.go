package commons

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"reflect"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/Stock_Data/api/conf"
	"github.com/go-kit/kit/log"
	gokithttp "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

func genericEncode(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

//GenerateHandlers Returns final handler for all service requests
func GenerateHandlers(ctx context.Context, services []ServiceEndpoint, config *conf.InternalConfig, logger log.Logger, hub *Hub) http.Handler {
	r := mux.NewRouter()

	options := []gokithttp.ServerOption{
		gokithttp.ServerErrorEncoder(EncodeError),
	}

	for _, se := range services {
		GenerateRoutes(ctx, r, se.Service, se.Endpoint, config, options, logger)
	}

	r.HandleFunc("/subscribe", func(w http.ResponseWriter, r *http.Request) {
		ServeWs(hub, w, r)
	})
	return r
}

//GenerateRoutes Creates and Attaches handlers and routes to the endpoints
func GenerateRoutes(ctx context.Context, r *mux.Router, service Service, endpoint Endpoint, config *conf.InternalConfig, options []gokithttp.ServerOption, logger log.Logger) {
	var decoder func(context.Context, *http.Request) (interface{}, error)
	decoder = GenerateDecodeRequestFunc(endpoint)

	if v, ok := service.(ServiceConfigurable); ok {
		v.SetConfig(config.GetConfig())
	}

	if v, ok := service.(FinnServiceConfigurable); ok {
		v.SetFinnClient(config.GetFinnClient())
	}

	ws := ServiceLogging(service, logger)

	r.Methods(
		endpoint.Info().Method,
	).Path(
		endpoint.Info().RelativePath,
	).Handler(gokithttp.NewServer(ctx, ws.Execute, decoder, genericEncode, options...))
}

func GetHeaderValue(name string, r *http.Request) string {
	return r.Header.Get(name)
}

func slice(name string, r *http.Request, curryFunc func(name string, r *http.Request) string) []string {
	c := curryFunc(name, r)
	// ensure we return 0 length array for empty result
	if len(c) == 0 {
		return nil
	}
	return strings.Split(c, ",")
}

func GetQueryParamValue(name string, r *http.Request) string {
	return r.URL.Query().Get(name)
}

func GetPathParamValue(name string, r *http.Request) string {
	vars := mux.Vars(r)
	return vars[name]
}

func GetFormParamValue(requestBody []byte, structure interface{}) error {
	err := json.Unmarshal(requestBody, &structure)
	if err != nil {
		return err
	}
	return nil
}

func makePrefixLower(s string) string {
	r, n := utf8.DecodeRuneInString(s)
	return string(unicode.ToLower(r)) + s[n:]
}

func doTypicalRequest(
	requestPart, fieldName string,
	fieldVal reflect.Value,
	r *http.Request,
	decode func(string, *http.Request) string,
) error {
	if fieldVal.Kind() == reflect.Slice {
		resultVal := slice(fieldName, r, decode)
		if strings.HasSuffix(requestPart, "!") {
			if len(resultVal) == 0 {
				return errors.New(fmt.Sprintf("%s is missing a required value", fieldName))
			}
		}
		fieldVal.Set(reflect.ValueOf(resultVal))
	} else {
		resultVal := decode(fieldName, r)
		if strings.HasSuffix(requestPart, "!") {
			if resultVal == "" {
				return errors.New(fmt.Sprintf("%s is missing a required value", fieldName))
			}
		}
		fieldVal.Set(reflect.ValueOf(resultVal))
	}
	return nil
}

func GenerateDecodeRequestFunc(requestObj interface{}) gokithttp.DecodeRequestFunc {
	return func(ctx context.Context, r *http.Request) (interface{}, error) {
		var err error
		if requestObj == nil {
			return nil, errors.New("request object is nil")
		}

		var objVal reflect.Value
		var objType reflect.Type

		if reflect.TypeOf(requestObj).Kind() != reflect.Ptr {
			objVal = reflect.New(reflect.TypeOf(requestObj)).Elem()
			objType = reflect.TypeOf(requestObj)
		} else {
			objVal = reflect.New(reflect.TypeOf(requestObj).Elem()).Elem()
			objType = reflect.TypeOf(requestObj).Elem()
		}

		if objType.Kind() != reflect.Struct {
			return requestObj, errors.New("cannot set a non-struct object")
		}
		var requestBody []byte
		if r.Body != nil {
			requestBody, err = ioutil.ReadAll(r.Body)
			if err != nil {
				return requestObj, err
			}

			defer r.Body.Close()
		}
		for i := 0; i < objType.NumField(); i++ {
			tag := objType.Field(i).Tag

			fieldVal := objVal.Field(i)
			fieldName := objType.Field(i).Name
			fieldName = makePrefixLower(fieldName)

			if fieldVal.Kind() == reflect.Struct && objType.Field(i).Anonymous {
				err2 := flattenStruct(fieldVal, objType.Field(i).Type, r, requestBody)
				if err2 != nil {
					return nil, err2
				}
			} else {
				err2 := interpretField(tag, fieldName, fieldVal, r, requestBody)
				if err2 != nil {
					return nil, err2
				}
			}
		}
		// perform validation of result
		return objVal.Addr().Interface(), nil
	}
}

func interpretField(tag reflect.StructTag, fieldName string, fieldVal reflect.Value, r *http.Request, requestBody []byte) error {
	var requestPart string

	requestPart = strings.ToLower(tag.Get("request"))

	if tag.Get("json") != "" {
		fieldName = strings.Split(tag.Get("json"), ",")[0]
	}
	if tag.Get("alias") != "" {
		fieldName = tag.Get("alias")
	}

	switch requestPart {
	case "header!", "header":
		err := doTypicalRequest(requestPart, fieldName, fieldVal, r, GetHeaderValue)
		if err != nil {
			return err
		}
	case "query!", "query":
		err := doTypicalRequest(requestPart, fieldName, fieldVal, r, GetQueryParamValue)
		if err != nil {
			return err
		}
	case "path!", "path":
		err := doTypicalRequest(requestPart, fieldName, fieldVal, r, GetPathParamValue)
		if err != nil {
			return err
		}
	case "form":
		if fieldVal.Kind() == reflect.Struct {
			v := reflect.New(fieldVal.Type()).Interface()
			err := GetFormParamValue(requestBody, v)
			if err != nil {
				return err
			}
			fieldVal.Set(reflect.ValueOf(v).Elem())
		}
	}
	return nil
}

func flattenStruct(ifv reflect.Value, ift reflect.Type, r *http.Request, requestBody []byte) error {
	for i := 0; i < ift.NumField(); i++ {
		fieldVal := ifv.Field(i)
		structField := ift.Field(i)
		fieldType := structField.Type
		fieldName := structField.Name
		fieldName = makePrefixLower(fieldName)
		fieldTag := structField.Tag
		if fieldVal.Kind() == reflect.Struct && structField.Anonymous {
			err := flattenStruct(fieldVal, fieldType, r, requestBody)
			if err != nil {
				return err
			}
		} else {
			err := interpretField(fieldTag, fieldName, fieldVal, r, requestBody)
			if err != nil {
				return err
			}
		}
	}
	return nil
}
