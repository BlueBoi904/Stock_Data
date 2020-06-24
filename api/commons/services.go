package commons

import (
	"context"

	"github.com/spf13/viper"
)

//ServiceEndpoint Base end point for handler
type ServiceEndpoint struct {
	Endpoint Endpoint
	Service  Service
}

//EndpointInfo Endpoint Data
type EndpointInfo struct {
	Path         string
	Method       string
	RelativePath string
}

//Endpoint Interface that extends to return info
type Endpoint interface {
	Info() EndpointInfo
}

//Service Base for the upcoming servce
type Service interface {
	Execute(ctx context.Context, req interface{}) (interface{}, error)
	GetConfig() *viper.Viper
}

type BaseService struct {
	config *viper.Viper
}
type ServiceConfigurable interface {
	SetConfig(cfg *viper.Viper)
}

func (bs *BaseService) SetConfig(cfg *viper.Viper) {
	bs.config = cfg
}

func (bs BaseService) Execute(ctx context.Context, req interface{}) (interface{}, error) {
	panic("implement me")
}

func (bs BaseService) GetConfig() *viper.Viper {
	return bs.config
}
