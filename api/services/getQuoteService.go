package services

import (
	"context"
	"fmt"

	"math/rand"
	"time"

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
	Ticker  string        `json:"ticker"`
	Quote   finnhub.Quote `json:"quote"`
}

//Execute Comment
func (gqs GetQuoteService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	request := req.(*GetQuoteRequest)
	finnClient := gqs.GetFinnClient()
	country := "US"
	var ticker string = ""

	stockSymbols, _, err := finnClient.StockSymbols(ctx, country)

	if err != nil {
		return GetQuoteReponse{
			Message: "Failed to retrive stock data.",
		}, err
	}

	s := rand.NewSource(time.Now().Unix())
	r := rand.New(s) // initialize local pseudorandom generator
	var randomInt = r.Intn(len(stockSymbols))
	randomStock := stockSymbols[randomInt].Symbol
	fmt.Printf("%+v\n", randomStock)
	if request.Ticker == "" {
		ticker = randomStock
	} else {
		ticker = request.Ticker
	}

	quote, _, err := finnClient.Quote(ctx, ticker)
	if err != nil {
		return GetQuoteReponse{
			Message: "Failed to retrive quote data.",
		}, err
	}

	return GetQuoteReponse{
		Message: "Success",
		Ticker:  ticker,
		Quote:   quote,
	}, nil
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
