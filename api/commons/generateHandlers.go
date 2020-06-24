package commons

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Stock_Data/api/conf"
	"github.com/go-kit/kit/log"
	gokithttp "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Homepage endpoint hit!")
}

func genericDecode(ctx context.Context, r *http.Request) (interface{}, error) {
	return nil, nil
}

func genericEncode(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	if _, ok := response.(AllErrors); ok {
		fmt.Printf("\n I Am Here \n")
		return nil
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	return json.NewEncoder(w).Encode(response)
}

//GenerateHandlers Returns final handler for all service requests
func GenerateHandlers(ctx context.Context, services []ServiceEndpoint, config *conf.InternalConfig, logger log.Logger) http.Handler {
	r := mux.NewRouter()

	options := []gokithttp.ServerOption{
		gokithttp.ServerErrorLogger(logger),
		gokithttp.ServerErrorEncoder(EncodeError),
	}

	for _, se := range services {
		GenerateRoutes(ctx, r, se.Service, se.Endpoint, config, options)
	}

	r.HandleFunc("/", homepage)

	return r
}

//GenerateRoutes Creates and Attaches handlers and routes to the endpoints
func GenerateRoutes(ctx context.Context, r *mux.Router, service Service, endpoint Endpoint, config *conf.InternalConfig, options []gokithttp.ServerOption) {
	r.Methods(
		endpoint.Info().Method,
	).Path(
		endpoint.Info().RelativePath,
	).Handler(gokithttp.NewServer(ctx, service.Execute, genericDecode, genericEncode, options...))
}
