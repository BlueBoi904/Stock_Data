package commons

//ServiceEndpoint Base end point for handler
type ServiceEndpoint struct {
	Endpoint Endpoint
	Service  Service
}

//EndpointInfo Endpoint Data
type EndpointInfo struct {
	Path string
}

//Endpoint Interface that extends to return info
type Endpoint interface {
	Info() EndpointInfo
}

//Service Base for the upcoming servce
type Service interface {
	Log() string
}
