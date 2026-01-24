package contextProviders

import (
	types "AdventureEngineServer/generatedDatabaseTypes"
	utils "AdventureEngineServer/utils"

	"gorm.io/gorm"
)

type ServiceContext struct {
	DatabaseContext *gorm.DB
	CurrentUser     *types.User
}

// We cannot formally inherit/extend types for function signatures, so even though
// the more specific service actions follow this pattern this is just kept around
// for use with custom endpoints if we need (which might have more specialized args)
type ServiceAction[T any, argType GetArgs[T] | GetByIdArgs[T] | SaveArgs[T], returnType GetReturn[T] | GetByIdReturn[T] | SaveReturn[T]] func(context *ServiceContext, args *argType) (returnType, error)

// I love love love not having access to conditional types, type literal params, or
// typespace field access to condense these into a more powerful generic, but alas

type GetArgs[T any] struct {
	Filters *[]utils.FilterExpression
}

type GetReturn[T any] []T

type GetByIdArgs[T any] struct {
	Id int
}

type GetByIdReturn[T any] *T

type SaveArgs[T any] struct {
	Items []*T
}

type SaveReturn[T any] []*T

func ProduceContextInjectedServiceAction[T any, argType GetArgs[T] | GetByIdArgs[T] | SaveArgs[T], returnType GetReturn[T] | GetByIdReturn[T] | SaveReturn[T]](db *gorm.DB, serviceAction ServiceAction[T, argType, returnType]) func(args *argType) (returnType, error) {

	//The generics spec on this technically does not prevent mixing and matching
	//something like GetArgs and SaveReturn, but this seems to be the only way
	//for now to get the more complex generic introspection to behave
	return func(args *argType) (returnType, error) {
		//This can additionally be the point that checks the current user status,
		//for now it is just set to nil for testing
		return serviceAction(&ServiceContext{
			DatabaseContext: db,
			CurrentUser:     nil,
		}, args)
	}
}

func ProduceGetArgs[T any](relationshipField string, fk *int) *GetArgs[T] {
	if fk == nil {
		return nil
	}

	filter := utils.FilterExpression{
		Field:       relationshipField,
		Operator:    "eq",
		FilterValue: string(rune(*fk)),
	}

	return &GetArgs[T]{
		Filters: &[]utils.FilterExpression{filter},
	}
}

func ProduceGetByIdArgs[T any](fk *int) *GetByIdArgs[T] {
	if fk == nil {
		return nil
	}

	return &GetByIdArgs[T]{
		Id: *fk,
	}
}
