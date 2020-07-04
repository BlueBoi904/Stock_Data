package services

import (
	"context"

	"github.com/Stock_Data/api/commons"
)

type TestSubRequest struct {
}

func (tsr TestSubRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "Sub",
		Method:       "GET",
		RelativePath: "/test",
	}
}

type TestSubService struct {
	commons.BaseService
}

type TestSubResponse struct {
	Type string `json:"type"`
}

func (tss TestSubService) Execute(ctx context.Context, req interface{}) (interface{}, error) {

	hub := tss.GetEmitSocket()

	hub.SendMessage(TestSubResponse{Type: "test"}, "test")

	return TestSubResponse{Type: "test"}, nil
}
