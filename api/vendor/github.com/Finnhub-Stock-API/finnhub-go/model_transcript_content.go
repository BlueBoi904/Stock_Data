/*
 * Finnhub API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package finnhub
// TranscriptContent struct for TranscriptContent
type TranscriptContent struct {
	// Speaker's name
	Name string `json:"name,omitempty"`
	// Speaker's speech
	Speech []string `json:"speech,omitempty"`
}
