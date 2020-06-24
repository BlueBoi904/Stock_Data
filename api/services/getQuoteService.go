package services

import (
	"context"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
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
	commons.BaseService
}

type GetQuoteReponse struct {
	Message string        `json:"message"`
	Quote   finnhub.Quote `json:"quote"`
}

//Execute Comment
func (gqs GetQuoteService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	finnClient := gqs.GetFinnClient()

	quote, _, err := finnClient.Quote(ctx, "AAPL")

	if err != nil {
		return GetQuoteReponse{}, err
	}

	return GetQuoteReponse{
		Message: "Success",
		Quote:   quote,
	}, nil
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
