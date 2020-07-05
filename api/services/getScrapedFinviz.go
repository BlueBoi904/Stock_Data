package services

import (
	"context"
	"fmt"

	"github.com/Stock_Data/api/commons"
	"github.com/gocolly/colly/v2"
)

type GetScrapedFinviz struct {
	Ticker string `request:"query!" json:"ticker" log:"true"`
}

func (gqr GetScrapedFinviz) Info() commons.EndpointInfo {
	return commons.EndpointInfo{
		Path:         "ScrapedFinviz",
		Method:       "GET",
		RelativePath: "/finviz",
	}
}

type GetScrapedFinvizService struct {
	commons.BaseService
}

type TableData struct {
	TableEntries []TableEntry `json:"stats"`
}

type TableEntry struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type GetScrapedFinvizResponse struct {
	Type string `json:"type"`
}

func (gsfs GetScrapedFinvizService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	request := req.(*GetScrapedFinviz)

	c := colly.NewCollector()

	tbData := TableData{
		TableEntries: []TableEntry{},
	}

	c.OnHTML("tr.table-dark-row", func(e *colly.HTMLElement) {
		title := e.ChildTexts(".snapshot-td2-cp")
		txt := e.ChildTexts(".snapshot-td2 b")

		tableRow := make([]TableEntry, len(title))

		for i, _ := range title {
			tableRow[i] = TableEntry{
				Key:   title[i],
				Value: txt[i],
			}
		}
		tbData.TableEntries = append(tbData.TableEntries, tableRow...)

		fmt.Println(tableRow)
	})

	url := fmt.Sprintf("https://finviz.com/quote.ashx?t=%v", request.Ticker)
	c.Visit(url)

	if tbData.TableEntries == nil || len(tbData.TableEntries) == 0 {
		return TableData{}, commons.AllErrors{Message: "Could not retrieve any data for " + request.Ticker}
	}

	return tbData, nil
}
