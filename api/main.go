package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/Stock_Data/api/commons"
	"github.com/Stock_Data/api/conf"
	"github.com/Stock_Data/api/services"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Homepage endpoint hit!")
}

func handleRequests() {

	ctx := context.Background()
	config := conf.Initialize("./conf")

	handlers := []commons.ServiceEndpoint{
		{
			Endpoint: new(services.GetQuoteRequest),
			Service:  new(services.GetQuoteService),
		},
	}

	h := commons.GenerateHandlers(ctx, handlers, config)

	fmt.Printf("\n Info: %v \n", handlers[0].Service.Log())

	log.Fatal(http.ListenAndServe(":8080", h))
}

func main() {
	handleRequests()
}
