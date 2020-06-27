package commons

import (
	"context"
	"time"

	finnhub "github.com/Finnhub-Stock-API/finnhub-go"
	"github.com/go-kit/kit/log"
	"github.com/spf13/viper"
)

type Loggable interface {
	log() basicLog
}

type basicLog struct {
	Key   string
	Value interface{}
}

//Middleware Defines a middleware service
type Middleware func(Service) Service

//ServiceLogging I think this works too
func ServiceLogging(s Service, logger log.Logger) Service {
	var next Service
	next = LoggingMiddleware(logger)(s)
	return next
}

//LoggingMiddleware I think this works
func LoggingMiddleware(logger log.Logger) Middleware {
	return func(next Service) Service {
		return &loggingMiddleware{
			next:   next,
			logger: logger,
		}
	}
}

type loggingMiddleware struct {
	next   Service
	logger log.Logger
}

func (lm loggingMiddleware) Execute(ctx context.Context, req interface{}) (r interface{}, err error) {
	defer func(begin time.Time) {
		baseLogs := []interface{}{
			"method", req.(Endpoint).Info().Path,
			"Request", req,
			"Response", r,
			"err", err,
		}
		lm.logger.Log(baseLogs...)
	}(time.Now())

	return lm.next.Execute(ctx, req)
}

func (mw loggingMiddleware) GetConfig() *viper.Viper {
	return mw.next.GetConfig()
}

func (mw loggingMiddleware) GetFinnClient() *finnhub.DefaultApiService {
	return mw.next.GetFinnClient()
}

func (lm loggingMiddleware) Log() string {
	return "Logging Middle Ware"
}

func (lm loggingMiddleware) GetEmitSocket() *Hub {
	return lm.next.GetEmitSocket()
}
