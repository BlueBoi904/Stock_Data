package services

import (
	"context"
	"encoding/csv"
	"fmt"
	"net/http"
	"strings"

	"github.com/Stock_Data/api/commons"
)

type GetHistoricalRequest struct {
	Ticker string `request:"query!" json:"ticker"`
}

func (ghr GetHistoricalRequest) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "Get Historical Data",
		Method:       "GET",
		RelativePath: "/historical",
	}
}

type GetHistoricalService struct {
	commons.BaseService
}

type GetHistoricalResponse struct {
	Data [][]string `json:"data"`
}

func (ghs GetHistoricalService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	request := req.(*GetHistoricalRequest)
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v7/finance/download/%v?period1=1562375687&period2=1593998087&interval=1d&events=history", request.Ticker)

	data, err := readCSVFromUrl(url)
	if err != nil {
		return GetHistoricalResponse{}, err
	}

	hsr := GetHistoricalResponse{
		Data: [][]string{},
	}

	for idx, row := range data {
		hsr.Data = append(hsr.Data, []string{})
		for _, r := range row {
			res := strings.Split(r, ",")
			hsr.Data[idx] = append(hsr.Data[idx], res...)
		}
	}

	return hsr, nil
}

func readCSVFromUrl(url string) ([][]string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	reader := csv.NewReader(resp.Body)
	reader.Comma = ';'
	data, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	return data, nil
}
