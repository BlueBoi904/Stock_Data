package services

import (
	"context"

	"github.com/Stock_Data/api/commons"
)

type GetQuoteRequest struct {
	Test string `request:"query" json:"test" log:"true"`
	Base string `request:"query" json:"base" log:"true"`
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
	// temp := req.(*GetQuoteRequest)

	return Response{
			Message: "Success?",
		}, commons.AllErrors{
			Message: "You Messed Up",
		}
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
