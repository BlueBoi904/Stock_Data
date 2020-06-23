package commons

import (
	"context"
	"net/http"

	"github.com/Stock_Data/api/conf"
	"github.com/gorilla/mux"
)

//GenerateHandlers Returns final handler for all service requests
func GenerateHandlers(ctx context.Context, services []ServiceEndpoint, config *conf.InternalConfig) http.Handler {
	r := mux.NewRouter()

	return r
}

//GenerateRoutes Creates and Attaches handlers and routes to the endpoints
func GenerateRoutes(r *mux.Router) {

}
