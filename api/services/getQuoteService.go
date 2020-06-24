package services

import (
	"context"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
	"github.com/Stock_Data/api/conf"
)

type GetQuoteRequest struct {
	Ticker string `request:"query" json:"ticker" log:"true"`
}

func (gqr GetQuoteRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "Quote",
		Method:       "GET",
		RelativePath: "/quote",
	}
}

type GetQuoteService struct {
}

type Response struct {
	Message string        `json:"message"`
	Quote   finnhub.Quote `json:"quote"`
}

func (gqs GetQuoteService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	config := conf.Initialize("./conf")
	apiKey := config.GetString("apiKey")

	// request := req.(*GetQuoteRequest)
	finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
	auth := context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
		Key: apiKey,
	})
	quote, _, err := finnhubClient.Quote(auth, "AAPL")

	if err != nil {
		return Response{}, err
	}

	return Response{
		Message: "Success",
		Quote:   quote,
	}, nil
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
