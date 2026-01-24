package contextProviders

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type GeneratedControllerContext[DBtype any, DTOtype any, argType GetArgs[DBtype] | GetByIdArgs[DBtype] | SaveArgs[DBtype], returnType GetReturn[DBtype] | GetByIdReturn[DBtype] | SaveReturn[DBtype]] struct {
	DatabaseContext *gorm.DB
	RequestContext  *gin.Context
	ServiceAction   func(args *argType) (returnType, error)
	DTOFlattener    func(args *DTOtype) *DBtype
	//The DTO interface is more hard-coded as it's not complex
	//enough to warrant a generic alias like the service interface
	DTOConverter func(obj *DBtype) (*DTOtype, error)
}

// We use a more flexible typing for custom controllers/services
// as they cannot be guaranteed to be able to nicely fit into the
// generated object handlers' logic context (i.e. auth workflow)
// and there's not a great way beyond any to let the function
// definition be as flexible as possible
type CustomControllerContext[DBtype any, DTOtype any] struct {
	DatabaseContext *gorm.DB
	RequestContext  *gin.Context
	ServiceAction   any
	DTOFlattener    func(args *DTOtype) *DBtype
	DTOConverter    func(obj *DBtype) (*DTOtype, error)
}

func ProduceContextInjectedGetController[DBType any, DTOType any](
	db *gorm.DB,
	serviceAction ServiceAction[DBType, GetArgs[DBType], GetReturn[DBType]],
	dtoConverter DTOConverter[DBType, DTOType],
	dtoFlattener DTOFlattener[DBType, DTOType],
	endpointHandler func(*GeneratedControllerContext[DBType, DTOType, GetArgs[DBType], GetReturn[DBType]]),
) gin.HandlerFunc {

	return func(ctx *gin.Context) {
		endpointHandler(&GeneratedControllerContext[DBType, DTOType, GetArgs[DBType], GetReturn[DBType]]{
			DatabaseContext: db,
			RequestContext:  ctx,
			ServiceAction:   ProduceContextInjectedServiceAction(db, serviceAction),
			DTOFlattener:    dtoFlattener,
			DTOConverter:    ProduceContextInjectedDTOConverter(db, dtoConverter),
		})
	}
}

func ProduceContextInjectedGetByIdController[DBType any, DTOType any](
	db *gorm.DB,
	serviceAction ServiceAction[DBType, GetByIdArgs[DBType], GetByIdReturn[DBType]],
	dtoConverter DTOConverter[DBType, DTOType],
	dtoFlattener DTOFlattener[DBType, DTOType],
	endpointHandler func(*GeneratedControllerContext[DBType, DTOType, GetByIdArgs[DBType], GetByIdReturn[DBType]]),
) gin.HandlerFunc {

	return func(ctx *gin.Context) {
		endpointHandler(&GeneratedControllerContext[DBType, DTOType, GetByIdArgs[DBType], GetByIdReturn[DBType]]{
			DatabaseContext: db,
			RequestContext:  ctx,
			ServiceAction:   ProduceContextInjectedServiceAction(db, serviceAction),
			DTOFlattener:    dtoFlattener,
			DTOConverter:    ProduceContextInjectedDTOConverter(db, dtoConverter),
		})
	}
}

func ProduceContextInjectedSaveController[DBType any, DTOType any](
	db *gorm.DB,
	serviceAction ServiceAction[DBType, SaveArgs[DBType], SaveReturn[DBType]],
	dtoConverter DTOConverter[DBType, DTOType],
	dtoFlattener DTOFlattener[DBType, DTOType],
	endpointHandler func(*GeneratedControllerContext[DBType, DTOType, SaveArgs[DBType], SaveReturn[DBType]]),
) gin.HandlerFunc {

	return func(ctx *gin.Context) {
		endpointHandler(&GeneratedControllerContext[DBType, DTOType, SaveArgs[DBType], SaveReturn[DBType]]{
			DatabaseContext: db,
			RequestContext:  ctx,
			ServiceAction:   ProduceContextInjectedServiceAction(db, serviceAction),
			DTOFlattener:    dtoFlattener,
			DTOConverter:    ProduceContextInjectedDTOConverter(db, dtoConverter),
		})
	}
}

func ProduceContextInjectedCustomController[DBType any, DTOType any](
	db *gorm.DB,
	serviceAction any,
	dtoConverter DTOConverter[DBType, DTOType],
	dtoFlattener DTOFlattener[DBType, DTOType],
	endpointHandler func(*CustomControllerContext[DBType, DTOType]),
) gin.HandlerFunc {

	return func(ctx *gin.Context) {
		endpointHandler(&CustomControllerContext[DBType, DTOType]{
			DatabaseContext: db,
			RequestContext:  ctx,
			ServiceAction:   serviceAction,
			DTOFlattener:    dtoFlattener,
			DTOConverter:    ProduceContextInjectedDTOConverter(db, dtoConverter),
		})
	}
}
