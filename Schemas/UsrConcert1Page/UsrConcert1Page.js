define("UsrConcert1Page", ["UsrPackageConstants"], function(UsrPackageConstants) {
	return {
		entitySchemaName: "UsrConcert",
		attributes: {
            "dailyShowsCountWithoutCurrent": {
                "dataValueType": Terrasoft.DataValueType.INTEGER,
                "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
            },
            "maxDailyShowsSysSetting": {
                "dataValueType": Terrasoft.DataValueType.INTEGER,
                "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
            }
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrConcertFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrConcert"
				}
			},
			"UsrSchema4877236bDetailbb9ef1f8": {
				"schemaName": "UsrSchema4877236bDetail",
				"entitySchemaName": "UsrShow",
				"filter": {
					"detailColumn": "UsrUsrConcert",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			onEntityInitialized: function(){
                this.callParent(arguments);
                this.getDailyShowsCount();
                this.getMaximumDailyActiveSections();
            },
            
            getDailyShowsCount: function() {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: UsrPackageConstants.Schema.UsrConcert
				});
				
				var thisId = this.get("Id");
				console.log(thisId);
				console.log(UsrPackageConstants.ConcertFrequency.Daily);
				
				esq.filters.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
				esq.filters.add("FrequencyFilter", this.Terrasoft.createColumnFilterWithParameter(
    				this.Terrasoft.ComparisonType.EQUAL, "UsrFrequency.Id", UsrPackageConstants.ConcertFrequency.Daily
				));
				esq.filters.add("IsActiveFilter", this.Terrasoft.createColumnFilterWithParameter(
    				this.Terrasoft.ComparisonType.EQUAL, "UsrIsActive", true
				));
				esq.filters.add("IdFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL, "Id", thisId
				));
				
				esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "Count");
				
				esq.getEntityCollection(function(result) { 
					if (result.success) {
						var resp = result.collection.collection.items[0].get("Count");
						console.log(resp);
						this.set("dailyShowsCountWithoutCurrent", resp);
					} else {
						console.error(UsrPackageConstants.Error(result.errorInfo.message).QueryError);
					}
				}, this);
            },
			// get sys data
            getMaximumDailyActiveSections: function() {
                var callback = function(value) {
					if(value) {
						this.set("maxDailyShowsSysSetting", value);
					}
                };
                this.Terrasoft.SysSettings.querySysSettingsItem(UsrPackageConstants.SysParamName, callback, this);
            },
			
			//validator for field
            setValidationConfig: function() {
                this.callParent(arguments);
                this.addColumnValidator("UsrFrequency", this.frequencyValidator);
            },
			frequencyValidator: function() {
				var invalidMessage= "";
				var freqObj = this.get("UsrFrequency").value;
				if (freqObj === UsrPackageConstants.ConcertFrequency.Daily) { 
					var isActive = this.get("UsrIsActive");
					var limit = this.get("maxDailyShowsSysSetting"); 
					var lengthCollection = this.get("dailyShowsCountWithoutCurrent");
					if (lengthCollection >= limit && isActive) {
						invalidMessage = UsrPackageConstants.Error(limit).LimitError;
					}
				}
				else {
					invalidMessage = "";
				}
				return {
					invalidMessage: invalidMessage
				};
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName2cc0ee7e-dfd9-4247-a428-c1b15051978b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP9df1f217-23a8-47e0-9072-e028223cc9bc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrTeam",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUPb94777b9-fb17-40db-ba95-633bcb88ac40",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrFrequency",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "STRING6f2af1f5-42d9-4da1-b5a6-8c0cbf765b4d",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCode",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUPc1787f22-1454-4a23-961c-fd5a8602416a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrResponsible",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrNotesa4c6c0a6-e445-45cc-830c-9f33583f3c42",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrNotes",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "BOOLEAN3c3b9b1f-fe45-4269-8989-0331d894abdd",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrIsActive",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab0c42eb60TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab0c42eb60TabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema4877236bDetailbb9ef1f8",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab0c42eb60TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
