package services

import (
	"context"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
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

type GetNewsResponse struct {
	Message string         `json:"message"`
	News    []finnhub.News `json:"news"`
}

func (gqs GetNewsService) Execute(ctx context.Context, req interface{}) (interface{}, error) {

	request := req.(*GetNewsRequest)
	finnClient := gqs.GetFinnClient()
	news, _, err := finnClient.CompanyNews(ctx, request.Ticker, "2020-05-01", "2020-05-01")

	if err != nil {
		return GetNewsResponse{}, err
	}

	return GetNewsResponse{
		Message: "Success",
		News:    news,
	}, nil
}

func (gqs GetNewsService) Log() string {
	return "Get News Service"
}
