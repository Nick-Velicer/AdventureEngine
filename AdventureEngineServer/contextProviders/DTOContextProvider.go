package contextProviders

import (
	"gorm.io/gorm"
)

type DTOContext struct {
	DatabaseContext *gorm.DB
	TraversedTables []string
	//Eventually we could pass in service actions
	//through context, but since we potentially
	//cover an unknown amount of the relationship
	//tree it would require all of them to be passed
	//in instead of a deterministic few
}

//No need right now to have a more complex args/return type for DTOS
//since there's not any additional non-context args that we need beyond
//the actual input/output objects for the moment

type DTOConverter[DbType any, DTOType any] func(context *DTOContext, obj *DbType) (*DTOType, error)

type DTOFlattener[DbType any, DTOType any] func(obj *DTOType) *DbType

func ProduceContextInjectedDTOConverter[T any, R any](db *gorm.DB, DTOConverter DTOConverter[T, R]) func(obj *T) (*R, error) {
	return func(obj *T) (*R, error) {
		return DTOConverter(&DTOContext{
			DatabaseContext: db,
			TraversedTables: []string{},
		}, obj)
	}
}
