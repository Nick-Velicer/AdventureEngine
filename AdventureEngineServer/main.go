package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/quantifier", getQuantifierTest)
	router.Run("localhost:8080")
}

func getQuantifierTest(c *gin.Context) {
	testId := "0"
	testTitle := "test title"
	testDescription := "test description"

	var quantifierTest QuantifierJson = QuantifierJson{
		Id: &testId,
		Attributes: TitleStringUndefinedDescriptionStringUndefinedQuantityNumberUndefinedDeltaNumberUndefinedRefreshOnShortRestBooleanUndefinedRefreshOnLongRestBooleanUndefinedUntilShortRestBooleanUndefinedUntilLongRestBooleanUndefinedLevelMinimumRequirementNumberUndefinedLevelMaximumRequirementNumberUndefinedImpactsSelfBooleanUndefinedIntoInventoryBooleanUndefinedIsActionBooleanUndefinedIsBonusActionBooleanUndefinedLevel1SpellSlotsNumberUndefinedLevel2SpellSlotsNumberUndefinedLevel3SpellSlotsNumberUndefinedLevel4SpellSlotsNumberUndefinedLevel5SpellSlotsNumberUndefinedLevel6SpellSlotsNumberUndefinedLevel7SpellSlotsNumberUndefinedLevel8SpellSlotsNumberUndefinedLevel9SpellSlotsNumberUndefined{
			Title:       &testTitle,
			Description: &testDescription,
		},
	}
	c.IndentedJSON(http.StatusOK, quantifierTest)
}
