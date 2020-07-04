package services

import (
	"context"

	"github.com/Stock_Data/api/commons"
)

type TestOtherRequest struct {
}

func (tsr TestOtherRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "Sub",
		Method:       "GET",
		RelativePath: "/other",
	}
}

type TestOtherService struct {
	commons.BaseService
}

type TestOtherResponse struct {
	Type string `json:"type"`
}

func (tss TestOtherService) Execute(ctx context.Context, req interface{}) (interface{}, error) {

	hub := tss.GetEmitSocket()

	hub.SendMessage(TestSubResponse{Type: "other"}, "other")

	return TestSubResponse{Type: "other"}, nil
}
