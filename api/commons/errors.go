package commons

import (
	"context"
	"encoding/json"
	"net/http"
)

//AllErrors Base Error Type
type AllErrors struct {
	Message string `json:"errorMessage"`
}

func (ae AllErrors) Error() string {
	return ae.Message
}

//EncodeError Make All errors passed as JSON
func EncodeError(_ context.Context, err error, w http.ResponseWriter) {
	if err == nil {
		panic("EncodeError with nil Error")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(400)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
