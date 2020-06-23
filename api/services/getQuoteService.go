package services

import (
	"github.com/Stock_Data/api/commons"
)

type GetQuoteRequest struct {
}

func (gqr GetQuoteRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path: "quote",
	}
}

type GetQuoteService struct {
}

func (gqs GetQuoteService) Log() string {
	return "Get Quote Service"
}
