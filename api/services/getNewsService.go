package services

import (
	"context"
	"fmt"

	"github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
)

type GetNewsRequest struct {
	Ticker string `request:"path" json:"ticker" log:"true"`
}

func (gqr GetNewsRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "News",
		Method:       "GET",
		RelativePath: "/news/{ticker}",
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
	// If a ticker is specified, return news for that stock. Otherwise, news on overall market

	request := req.(*GetNewsRequest)
	finnClient := gqs.GetFinnClient()

	news, _, err := finnClient.CompanyNews(ctx, request.Ticker, "2020-06-05", "2020-06-05")

	fmt.Println(err)
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
