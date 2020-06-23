package services

import (
	"github.com/Stock_Data/api/commons"
)

type GetGeneralNewsRequest struct {
}

func (gqr GetGeneralNewsRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path: "news",
	}
}

type GetGeneralNewsService struct {
}

func (gqs GetGeneralNewsService) Log() string {
	return "Get Quote Service"
}
