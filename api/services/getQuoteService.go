package services

import (
	"context"

	"github.com/Stock_Data/api/commons"
)

type GetQuoteRequest struct {
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
	Message string `json:"message"`
}

func (gqs GetQuoteService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	return Response{}, commons.AllErrors{
		Message: "Failure",
	}
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
