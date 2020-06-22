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

func quote(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Fprintf(w, "Quote page hit!")
	config := conf.Initialize("./conf")
	apiKey := config.GetString("apiKey")

	finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
	auth := context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
		Key: apiKey,
	})
	// Get quote on APPL
	quote, _, err := finnhubClient.Quote(auth, "AAPL")
	fmt.Printf("%+v\n", quote)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Quote: %v", quote.C)
}

func handleRequests() {
	http.HandleFunc("/", homepage)
	http.HandleFunc("/quote", quote)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	handleRequests()
}
