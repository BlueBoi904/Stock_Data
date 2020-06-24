package main

import (
	"context"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	finnhub "github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/Stock_Data/api/commons"
	"github.com/Stock_Data/api/conf"
	"github.com/Stock_Data/api/services"
	"github.com/go-kit/kit/log"
	"github.com/rs/cors"
	"github.com/totalwinelabs/go-common/src/corshdr"
)

func handleRequests() {
	ctx := context.Background()
	config := conf.Initialize("./conf")

	apiKey := config.GetString("apiKey")

	finnhubClient := finnhub.NewAPIClient(finnhub.NewConfiguration()).DefaultApi
	auth := context.WithValue(ctx, finnhub.ContextAPIKey, finnhub.APIKey{
		Key: apiKey,
	})

	config.SetFinnClient(finnhubClient)

	handlers := []commons.ServiceEndpoint{
		{
			Endpoint: new(services.GetQuoteRequest),
			Service:  new(services.GetQuoteService),
		},
		{
			Endpoint: new(services.GetNewsRequest),
			Service: new(services.GetNewsService),
		},
	}

	var (
		httpAddr = flag.String("http.addr", ":8080", "HTTP listen address")
	)
	flag.Parse()

	var logger log.Logger
	{
		logger = log.NewJSONLogger(log.NewSyncWriter(os.Stderr))
	}

	h := commons.GenerateHandlers(auth, handlers, config, logger)
	c := cors.New(cors.Options{
		AllowOriginFunc:  corshdr.AllowOriginFunc,
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})
	h = c.Handler(h)

	errs := make(chan error)
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errs <- fmt.Errorf("%s", <-c)
	}()

	go func() {
		logger.Log("transport", "HTTP", "addr", *httpAddr)
		errs <- http.ListenAndServe(":8080", h)
	}()

	logger.Log("exit", <-errs)
}

func main() {
	handleRequests()
}
