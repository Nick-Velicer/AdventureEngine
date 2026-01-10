package utils

import (
	"errors"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

func Map[T, V any](ts []T, fn func(T) V) []V {
	result := make([]V, len(ts))
	for i, t := range ts {
		result[i] = fn(t)
	}
	return result
}

type FilterExpression struct {
	Field       string
	Operator    string
	FilterValue string
}

func ParseFilterURLExpression(filters map[string]string) []FilterExpression {

	returnBuffer := []FilterExpression{}

	//Expecting to handle filters with the syntax:
	//filter[field]=[operator]value
	//(mapped to key-values without the equals)

	for fieldPrefix, operatorAndValue := range filters {

		formattedPrefix := fieldPrefix
		formattedPrefix = strings.Replace(fieldPrefix, "filter[", "", 1)
		formattedPrefix = strings.Replace(formattedPrefix, "]", "", 1)

		fmt.Println(formattedPrefix)

		separatedOperatorAndValue := strings.Split(operatorAndValue[1:], "]")

		fmt.Println(separatedOperatorAndValue)

		if len(separatedOperatorAndValue) != 2 {

			fmt.Println("Unexpected filter configuration, skipping:")
			fmt.Println(fieldPrefix + "=" + operatorAndValue)

		} else {
			returnBuffer = append(returnBuffer, FilterExpression{
				Field:       formattedPrefix,
				Operator:    separatedOperatorAndValue[0],
				FilterValue: separatedOperatorAndValue[1],
			})
		}

	}
	fmt.Println(returnBuffer)
	return returnBuffer
}

// Translates the more readable filters to the gorm context and applies them
// to a given context. Makes a bit more syntactic sense than producing the clauses
// and doing some function management shenanigans to manually apply them elsewhere.
func FilterTableContext(dbContext *gorm.DB, filters *[]FilterExpression) (*gorm.DB, error) {

	//This can be optimized if need be, but I'm
	//currently not wanting to get into the gorm interfaces
	//more than I have to and chaining like this works

	if filters == nil || len(*filters) == 0 {
		//No need to error if nothing is provided, just don't filter
		//and continue gracefully
		return dbContext, nil
	}

	updateBuffer := dbContext

	for _, filter := range *filters {
		switch filter.Operator {
		case "eq":
			updateBuffer = updateBuffer.Where(filter.Field+" = ?", filter.FilterValue)
		case "neq":
			updateBuffer = updateBuffer.Where(filter.Field+" != ?", filter.FilterValue)
		case "lt":
			updateBuffer = updateBuffer.Where(filter.Field+" < ?", filter.FilterValue)
		case "lte":
			updateBuffer = updateBuffer.Where(filter.Field+" <= ?", filter.FilterValue)
		case "gt":
			updateBuffer = updateBuffer.Where(filter.Field+" > ?", filter.FilterValue)
		case "gte":
			updateBuffer = updateBuffer.Where(filter.Field+" => ?", filter.FilterValue)
		default:
			return nil, errors.New("Could not parse operator for filter: " + filter.Field + " " + filter.Operator + " " + filter.FilterValue)
		}
	}

	return updateBuffer, nil
}

func GetEnvVar(key string) string {

	//Eventually this can be managed as app context instead of having to load it every time
	//but that's not really set up in a convenient way so this works for now.
	err := godotenv.Load()

	if err != nil {
		fmt.Println(err)
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
