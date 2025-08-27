package utils

import "reflect"

func Map[T, V any](ts []T, fn func(T) V) []V {
	result := make([]V, len(ts))
	for i, t := range ts {
		result[i] = fn(t)
	}
	return result
}

//If trying to access a table again from a circular DTO relationship, return a nil pointer to prevent further generation
func GetDTOPointer[T any, G any](dtoConverter func(param T) *G, buffer T, originTable string) *G {
	if originTable == reflect.TypeOf(buffer).Name() {
		print("Circular relationship detected, accessing table " + originTable)
		return nil
	}
	return dtoConverter(buffer)
}
