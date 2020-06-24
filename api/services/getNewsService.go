package services

import (
	"context"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
	"github.com/Stock_Data/api/conf"
)

type GetNewsRequest struct {
	Ticker string `request:"query" json:"ticker" log:"true"`
}

func (gqr GetNewsRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "News",
		Method:       "GET",
		RelativePath: "/news",
	}
}

type GetNewsService struct {
	commons.BaseService
}

type Response struct {
	Message string       `json:"message"`
	News    finnhub.News `json:"news"`
}

func (gqs GetNewsService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	config := conf.Initialize("./conf")
	apiKey := config.GetString("apiKey")

	request := req.(*GetNewsRequest)
	finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
	auth := context.WithValue(context.Background(), finnhub.ContextAPIKey, finnhub.APIKey{
		Key: apiKey,
	})
	news, _, err := finnhubClient.CompanyNews(auth, request.Ticker, "2020-05-01", "2020-05-01")

	if err != nil {
		return Response{}, err
	}

	return Response{
		Message: "Success",
		News:    news,
	}, nil
}

func (gqs GetNewsService) Log() string {
	return "Get Quote Service"
}
