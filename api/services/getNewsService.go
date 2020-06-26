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
	// If a ticker is specified, return news for that stock. Otherwise, news on overall market

	request := req.(*GetNewsRequest)
	finnClient := gqs.GetFinnClient()
	var news []finnhub.News

	if request.Ticker == "" {
		generalNews, _, err := finnClient.GeneralNews(ctx, "general", nil)

		if err != nil {
			return GetNewsResponse{}, err
		}
		news = generalNews
	} else {
		companyNews, _, err := finnClient.CompanyNews(ctx, request.Ticker, "2020-05-01", "2020-05-01")
		if err != nil {
			return GetNewsResponse{}, err
		}
		news = companyNews
	}

	return GetNewsResponse{
		Message: "Success",
		News:    news,
	}, nil
}

func (gqs GetNewsService) Log() string {
	return "Get News Service"
}
