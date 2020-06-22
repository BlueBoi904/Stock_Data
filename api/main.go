package main

import (
	"context"
	"fmt"
	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/conf"
	"log"
	"net/http"
)


func homepage(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Homepage endpoint hit!")
}

func handleRequests() {
	http.HandleFunc("/", homepage)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	config := conf.Initialize("./conf")
	apiKey := config.GetString("apiKey")

	fmt.Printf("Api Key:%v", apiKey)
	finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
	auth := context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
		Key: apiKey,
	})

	quote, _, err := finnhubClient.Quote(auth, "AAPL")
	fmt.Printf("%+v\n", quote)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Quote: %v", quote.C)
	handleRequests()
}
