package conf

import (
	"fmt"

	"github.com/spf13/viper"
)

//InternalConfig For Storing Items across app
type InternalConfig struct {
	v *viper.Viper
}

//GetString  returns value of desired key
func (i *InternalConfig) GetString(key string) string {
	return i.v.GetString(key)
}

//PrintValues Util to log all Vipers values
func (i *InternalConfig) PrintValues() {
	for _, k := range i.v.AllKeys() {
		fmt.Printf("%s = %s\n", k, i.v.GetString(k))
	}
}

//Initialize config starting with the base path
func Initialize(path string) *InternalConfig {
	v := viper.New()
	v.AddConfigPath(path)
	v.SetConfigName("base")
	v.AutomaticEnv()

	err := v.MergeInConfig()
	if err != nil {
		fmt.Println("Error With Config")
	}
	env := v.GetString("ENV")

	if env != "" {
		v.SetConfigName(env)
		err = v.MergeInConfig()
		if err != nil {
			fmt.Println("Error Merging Config")
		}
	}

	config := InternalConfig{
		v: v,
	}

	return &config
}
