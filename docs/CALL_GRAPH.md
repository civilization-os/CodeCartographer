# Call Graph

调用图只展示能够唯一匹配到仓库内部方法单元的调用表达式。

```mermaid
flowchart TD
  N0_A["scan"]
  N0_B["scan"]
  N0_A --> N0_B
  N1_A["analyzeRepo"]
  N1_B["addSyntheticRepositoryMethods"]
  N1_A --> N1_B
  N2_A["analyzeRepo"]
  N2_B["attachHeuristicSemantics"]
  N2_A --> N2_B
  N3_A["analyzeRepo"]
  N3_B["buildRelationGraph"]
  N3_A --> N3_B
  N4_A["analyzeRepo"]
  N4_B["buildScanRuntimeInfo"]
  N4_A --> N4_B
  N5_A["analyzeRepo"]
  N5_B["enrichModulesWithMethodSemantics"]
  N5_A --> N5_B
  N6_A["analyzeRepo"]
  N6_B["loadModelConfig"]
  N6_A --> N6_B
  N7_A["analyzeRepo"]
  N7_B["parseModules"]
  N7_A --> N7_B
  N8_A["analyzeRepo"]
  N8_B["scanRepo"]
  N8_A --> N8_B
  N9_A["analyzeRepo"]
  N9_B["toModelRuntimeInfo"]
  N9_A --> N9_B
  N10_A["addSyntheticRepositoryMethods"]
  N10_B["buildSyntheticRepositoryMethod"]
  N10_A --> N10_B
  N11_A["addSyntheticRepositoryMethods"]
  N11_B["collectRepositoryOperations"]
  N11_A --> N11_B
  N12_A["addSyntheticRepositoryMethods"]
  N12_B["indexRepositoryClasses"]
  N12_A --> N12_B
  N13_A["collectRepositoryOperations"]
  N13_B["parseRepositoryCall"]
  N13_A --> N13_B
  N14_A["collectRepositoryOperations"]
  N14_B["parseRepositoryResource"]
  N14_A --> N14_B
  N15_A["buildSyntheticRepositoryMethod"]
  N15_B["stableId"]
  N15_A --> N15_B
  N16_A["buildSyntheticRepositoryMethod"]
  N16_B["syntheticParameters"]
  N16_A --> N16_B
  N17_A["buildSyntheticRepositoryMethod"]
  N17_B["syntheticReturnType"]
  N17_A --> N17_B
  N18_A["loadProjectConfig"]
  N18_B["rejectSensitiveKeys"]
  N18_A --> N18_B
  N19_A["rejectSensitiveKeys"]
  N19_B["rejectSensitiveKeys"]
  N19_A --> N19_B
  N20_A["generateDocs"]
  N20_B["buildQualitySummary"]
  N20_A --> N20_B
  N21_A["generateDocs"]
  N21_B["buildSemanticOverview"]
  N21_A --> N21_B
  N22_A["generateDocs"]
  N22_B["composeProjectNarrative"]
  N22_A --> N22_B
  N23_A["generateDocs"]
  N23_B["renderArchitecture"]
  N23_A --> N23_B
  N24_A["generateDocs"]
  N24_B["renderBusinessFlows"]
  N24_A --> N24_B
  N25_A["generateDocs"]
  N25_B["renderCallGraph"]
  N25_A --> N25_B
  N26_A["generateDocs"]
  N26_B["renderDataAndResources"]
  N26_A --> N26_B
  N27_A["generateDocs"]
  N27_B["renderDocIndex"]
  N27_A --> N27_B
  N28_A["generateDocs"]
  N28_B["renderEntrypoints"]
  N28_A --> N28_B
  N29_A["generateDocs"]
  N29_B["renderExecutionFlows"]
  N29_A --> N29_B
  N30_A["generateDocs"]
  N30_B["renderMaintenanceGuide"]
  N30_A --> N30_B
  N31_A["generateDocs"]
  N31_B["renderModules"]
  N31_A --> N31_B
  N32_A["generateDocs"]
  N32_B["renderProjectOverview"]
  N32_A --> N32_B
  N33_A["generateDocs"]
  N33_B["renderQualityReport"]
  N33_A --> N33_B
  N34_A["renderDocIndex"]
  N34_B["bulletList"]
  N34_A --> N34_B
  N35_A["renderDocIndex"]
  N35_B["heading"]
  N35_A --> N35_B
  N36_A["renderDocIndex"]
  N36_B["isInternalResource"]
  N36_A --> N36_B
  N37_A["renderDocIndex"]
  N37_B["numberedList"]
  N37_A --> N37_B
  N38_A["renderDocIndex"]
  N38_B["table"]
  N38_A --> N38_B
  N39_A["renderProjectOverview"]
  N39_B["bulletList"]
  N39_A --> N39_B
  N40_A["renderProjectOverview"]
  N40_B["heading"]
  N40_A --> N40_B
  N41_A["renderProjectOverview"]
  N41_B["isInternalResource"]
  N41_A --> N41_B
  N42_A["renderProjectOverview"]
  N42_B["numberedList"]
  N42_A --> N42_B
  N43_A["renderProjectOverview"]
  N43_B["table"]
  N43_A --> N43_B
  N44_A["renderArchitecture"]
  N44_B["bulletList"]
  N44_A --> N44_B
  N45_A["renderArchitecture"]
  N45_B["formatMethodName"]
  N45_A --> N45_B
  N46_A["renderArchitecture"]
  N46_B["heading"]
  N46_A --> N46_B
  N47_A["renderArchitecture"]
  N47_B["isInternalResource"]
  N47_A --> N47_B
  N48_A["renderArchitecture"]
  N48_B["table"]
  N48_A --> N48_B
  N49_A["renderModules"]
  N49_B["bulletList"]
  N49_A --> N49_B
  N50_A["renderModules"]
  N50_B["formatMethodHints"]
  N50_A --> N50_B
  N51_A["renderModules"]
  N51_B["heading"]
  N51_A --> N51_B
  N52_A["renderModules"]
  N52_B["selectHighSignalMethods"]
  N52_A --> N52_B
  N53_A["renderModules"]
  N53_B["table"]
  N53_A --> N53_B
  N54_A["selectHighSignalMethods"]
  N54_B["scoreMethodForModuleDocs"]
  N54_A --> N54_B
  N55_A["renderCallGraph"]
  N55_B["escapeMermaid"]
  N55_A --> N55_B
  N56_A["renderCallGraph"]
  N56_B["heading"]
  N56_A --> N56_B
  N57_A["renderCallGraph"]
  N57_B["table"]
  N57_A --> N57_B
  N58_A["renderExecutionFlows"]
  N58_B["bulletList"]
  N58_A --> N58_B
  N59_A["renderExecutionFlows"]
  N59_B["formatMethodName"]
  N59_A --> N59_B
  N60_A["renderExecutionFlows"]
  N60_B["heading"]
  N60_A --> N60_B
  N61_A["renderBusinessFlows"]
  N61_B["bulletList"]
  N61_A --> N61_B
  N62_A["renderBusinessFlows"]
  N62_B["formatMethodName"]
  N62_A --> N62_B
  N63_A["renderBusinessFlows"]
  N63_B["heading"]
  N63_A --> N63_B
  N64_A["renderBusinessFlows"]
  N64_B["matchingNarrativeFlow"]
  N64_A --> N64_B
  N65_A["renderBusinessFlows"]
  N65_B["numberedList"]
  N65_A --> N65_B
  N66_A["renderBusinessFlows"]
  N66_B["table"]
  N66_A --> N66_B
  N67_A["renderEntrypoints"]
  N67_B["formatMethodName"]
  N67_A --> N67_B
  N68_A["renderEntrypoints"]
  N68_B["heading"]
  N68_A --> N68_B
  N69_A["renderEntrypoints"]
  N69_B["table"]
  N69_A --> N69_B
  N70_A["renderDataAndResources"]
  N70_B["heading"]
  N70_A --> N70_B
  N71_A["renderDataAndResources"]
  N71_B["isInternalResource"]
  N71_A --> N71_B
  N72_A["renderDataAndResources"]
  N72_B["table"]
  N72_A --> N72_B
  N73_A["renderMaintenanceGuide"]
  N73_B["bulletList"]
  N73_A --> N73_B
  N74_A["renderMaintenanceGuide"]
  N74_B["heading"]
  N74_A --> N74_B
  N75_A["renderMaintenanceGuide"]
  N75_B["table"]
  N75_A --> N75_B
  N76_A["composeProjectNarrative"]
  N76_B["NarrativeCache#open"]
  N76_A --> N76_B
  N77_A["composeProjectNarrative"]
  N77_B["buildNarrativeContext"]
  N77_A --> N77_B
  N78_A["composeProjectNarrative"]
  N78_B["buildNarrativePrompt"]
  N78_A --> N78_B
  N79_A["composeProjectNarrative"]
  N79_B["createChatModel"]
  N79_A --> N79_B
  N80_A["composeProjectNarrative"]
  N80_B["fallbackNarrative"]
  N80_A --> N80_B
  N81_A["composeProjectNarrative"]
  N81_B["parseNarrativeResponse"]
  N81_A --> N81_B
  N82_A["fallbackNarrative"]
  N82_B["fallbackOperatingModel"]
  N82_A --> N82_B
  N83_A["renderQualityReport"]
  N83_B["buildQualitySummary"]
  N83_A --> N83_B
  N84_A["renderQualityReport"]
  N84_B["bulletList"]
  N84_A --> N84_B
  N85_A["renderQualityReport"]
  N85_B["heading"]
  N85_A --> N85_B
  N86_A["renderQualityReport"]
  N86_B["table"]
  N86_A --> N86_B
  N87_A["buildQualitySummary"]
  N87_B["buildChecks"]
  N87_A --> N87_B
  N88_A["buildQualitySummary"]
  N88_B["calculateScore"]
  N88_A --> N88_B
  N89_A["buildQualitySummary"]
  N89_B["recommendations"]
  N89_A --> N89_B
  N90_A["buildChecks"]
  N90_B["countMatches"]
  N90_A --> N90_B
  N91_A["buildChecks"]
  N91_B["hasRequiredDocs"]
  N91_A --> N91_B
  N92_A["buildChecks"]
  N92_B["isChineseNarrative"]
  N92_A --> N92_B
  N93_A["buildChecks"]
  N93_B["maxDocLength"]
  N93_A --> N93_B
  N94_A["buildChecks"]
  N94_B["methodSummaryCoverageCheck"]
  N94_A --> N94_B
  N95_A["buildSemanticOverview"]
  N95_B["buildBusinessFlows"]
  N95_A --> N95_B
  N96_A["buildSemanticOverview"]
  N96_B["buildFlows"]
  N96_A --> N96_B
  N97_A["buildSemanticOverview"]
  N97_B["buildResourceUsage"]
  N97_A --> N97_B
  N98_A["buildSemanticOverview"]
  N98_B["countEdges"]
  N98_A --> N98_B
  N99_A["buildSemanticOverview"]
  N99_B["groupModules"]
  N99_A --> N99_B
  N100_A["buildSemanticOverview"]
  N100_B["inferPurpose"]
  N100_A --> N100_B
  N101_A["buildBusinessFlows"]
  N101_B["formatMethodName"]
  N101_A --> N101_B
  N102_A["buildBusinessFlows"]
  N102_B["walkFlow"]
  N102_A --> N102_B
  N103_A["groupModules"]
  N103_B["inferGroupName"]
  N103_A --> N103_B
  N104_A["groupModules"]
  N104_B["summarizeGroup"]
  N104_A --> N104_B
  N105_A["groupModules"]
  N105_B["summarizeResponsibilities"]
  N105_A --> N105_B
  N106_A["inferGroupName"]
  N106_B["inferJavaGroupName"]
  N106_A --> N106_B
  N107_A["inferPurpose"]
  N107_B["collectResourceNames"]
  N107_A --> N107_B
  N108_A["inferPurpose"]
  N108_B["formatChineseList"]
  N108_A --> N108_B
  N109_A["buildFlows"]
  N109_B["formatMethodName"]
  N109_A --> N109_B
  N110_A["buildFlows"]
  N110_B["walkFlow"]
  N110_A --> N110_B
  N111_A["buildResourceUsage"]
  N111_B["isInternalResource"]
  N111_A --> N111_B
  N112_A["buildRelationGraph"]
  N112_B["buildMethodNameIndex"]
  N112_A --> N112_B
  N113_A["buildRelationGraph"]
  N113_B["dedupeEdges"]
  N113_A --> N113_B
  N114_A["buildRelationGraph"]
  N114_B["relationKindForResource"]
  N114_A --> N114_B
  N115_A["buildRelationGraph"]
  N115_B["resolveCallTarget"]
  N115_A --> N115_B
  N116_A["buildRelationGraph"]
  N116_B["scoreCall"]
  N116_A --> N116_B
  N117_A["buildRelationGraph"]
  N117_B["stableId"]
  N117_A --> N117_B
  N118_A["extractResources"]
  N118_B["resourceKind"]
  N118_A --> N118_B
  N119_A["extractResources"]
  N119_B["stableId"]
  N119_A --> N119_B
  N120_A["main"]
  N120_B["analyzeRepo"]
  N120_A --> N120_B
  N121_A["main"]
  N121_B["generateDocs"]
  N121_A --> N121_B
  N122_A["main"]
  N122_B["loadModelConfig"]
  N122_A --> N122_B
  N123_A["main"]
  N123_B["loadProjectConfig"]
  N123_A --> N123_B
  N124_A["main"]
  N124_B["parseArgs"]
  N124_A --> N124_B
  N125_A["main"]
  N125_B["printHelp"]
  N125_A --> N125_B
  N126_A["main"]
  N126_B["writeResultJson"]
  N126_A --> N126_B
  N127_A["parseArgs"]
  N127_B["requireValue"]
  N127_A --> N127_B
  N128_A["enrichModulesWithMethodSemantics"]
  N128_B["MethodSemanticCache#open"]
  N128_A --> N128_B
  N129_A["enrichModulesWithMethodSemantics"]
  N129_B["analyzeMethodWithLlm"]
  N129_A --> N129_B
  N130_A["enrichModulesWithMethodSemantics"]
  N130_B["createChatModel"]
  N130_A --> N130_B
  N131_A["enrichModulesWithMethodSemantics"]
  N131_B["formatError"]
  N131_A --> N131_B
  N132_A["enrichModulesWithMethodSemantics"]
  N132_B["heuristicSemantic"]
  N132_A --> N132_B
  N133_A["enrichModulesWithMethodSemantics"]
  N133_B["mapWithConcurrency"]
  N133_A --> N133_B
  N134_A["enrichModulesWithMethodSemantics"]
  N134_B["summarizeModuleFromMethods"]
  N134_A --> N134_B
  N135_A["attachHeuristicSemantics"]
  N135_B["heuristicSemantic"]
  N135_A --> N135_B
  N136_A["analyzeMethodWithLlm"]
  N136_B["buildPrompt"]
  N136_A --> N136_B
  N137_A["analyzeMethodWithLlm"]
  N137_B["parseModelResponse"]
  N137_A --> N137_B
  N138_A["parseModelResponse"]
  N138_B["normalizeSemantic"]
  N138_A --> N138_B
  N139_A["buildPrompt"]
  N139_B["trimSource"]
  N139_A --> N139_B
  N140_A["loadModelConfig"]
  N140_B["defaultBaseUrl"]
  N140_A --> N140_B
  N141_A["loadModelConfig"]
  N141_B["defaultModel"]
  N141_A --> N141_B
  N142_A["loadModelConfig"]
  N142_B["getApiKey"]
  N142_A --> N142_B
  N143_A["loadModelConfig"]
  N143_B["parseInteger"]
  N143_A --> N143_B
  N144_A["loadModelConfig"]
  N144_B["parseNumber"]
  N144_A --> N144_B
  N145_A["loadModelConfig"]
  N145_B["parseOptionalInteger"]
  N145_A --> N145_B
  N146_A["writeResultJson"]
  N146_B["buildResultDiff"]
  N146_A --> N146_B
  N147_A["writeResultJson"]
  N147_B["renderChangeSummary"]
  N147_A --> N147_B
  N148_A["writeResultJson"]
  N148_B["toResultJson"]
  N148_A --> N148_B
  N149_A["toResultJson"]
  N149_B["toPosixPath"]
  N149_A --> N149_B
  N150_A["serializeEntrypoint"]
  N150_B["methodRef"]
  N150_A --> N150_B
  N151_A["serializeFlow"]
  N151_B["methodRef"]
  N151_A --> N151_B
  N152_A["serializeBusinessFlow"]
  N152_B["methodRef"]
  N152_A --> N152_B
  N153_A["methodRef"]
  N153_B["formatMethodName"]
  N153_A --> N153_B
  N154_A["buildResultDiff"]
  N154_B["businessFlows"]
  N154_A --> N154_B
  N155_A["buildResultDiff"]
  N155_B["diffByKey"]
  N155_A --> N155_B
  N156_A["buildResultDiff"]
  N156_B["emptyBaselineDiff"]
  N156_A --> N156_B
  N157_A["buildResultDiff"]
  N157_B["entrypoints"]
  N157_A --> N157_B
  N158_A["buildResultDiff"]
  N158_B["files"]
  N158_A --> N158_B
  N159_A["buildResultDiff"]
  N159_B["methods"]
  N159_A --> N159_B
  N160_A["buildResultDiff"]
  N160_B["qualityScore"]
  N160_A --> N160_B
  N161_A["buildResultDiff"]
  N161_B["resources"]
  N161_A --> N161_B
  N162_A["buildResultDiff"]
  N162_B["stableStringify"]
  N162_A --> N162_B
  N163_A["buildResultDiff"]
  N163_B["stringField"]
  N163_A --> N163_B
  N164_A["emptyBaselineDiff"]
  N164_B["emptyChangeSet"]
  N164_A --> N164_B
  N165_A["emptyBaselineDiff"]
  N165_B["qualityScore"]
  N165_A --> N165_B
  N166_A["emptyBaselineDiff"]
  N166_B["stringField"]
  N166_A --> N166_B
  N167_A["files"]
  N167_B["arrayField"]
  N167_A --> N167_B
  N168_A["files"]
  N168_B["numberValue"]
  N168_A --> N168_B
  N169_A["files"]
  N169_B["stringValue"]
  N169_A --> N169_B
  N170_A["methods"]
  N170_B["arrayField"]
  N170_A --> N170_B
  N171_A["methods"]
  N171_B["stringValue"]
  N171_A --> N171_B
  N172_A["entrypoints"]
  N172_B["arrayField"]
  N172_A --> N172_B
  N173_A["entrypoints"]
  N173_B["methods"]
  N173_A --> N173_B
  N174_A["entrypoints"]
  N174_B["stringValue"]
  N174_A --> N174_B
  N175_A["resources"]
  N175_B["arrayField"]
  N175_A --> N175_B
  N176_A["businessFlows"]
  N176_B["arrayField"]
  N176_A --> N176_B
  N177_A["businessFlows"]
  N177_B["objectField"]
  N177_A --> N177_B
  N178_A["renderChangeSummary"]
  N178_B["renderEntrypointList"]
  N178_A --> N178_B
  N179_A["renderChangeSummary"]
  N179_B["renderMethodList"]
  N179_A --> N179_B
  N180_A["renderChangeSummary"]
  N180_B["renderStringChange"]
  N180_A --> N180_B
  N181_A["qualityScore"]
  N181_B["numberValue"]
  N181_A --> N181_B
  N182_A["qualityScore"]
  N182_B["objectField"]
  N182_A --> N182_B
  N183_A["stringField"]
  N183_B["stringValue"]
  N183_A --> N183_B
  N184_A["stableStringify"]
  N184_B["stableStringify"]
  N184_A --> N184_B
  N185_A["parseJavaModule"]
  N185_B["buildClassResourceIndex"]
  N185_A --> N185_B
  N186_A["parseJavaModule"]
  N186_B["buildLineIndex"]
  N186_A --> N186_B
  N187_A["parseJavaModule"]
  N187_B["extractClassBlocks"]
  N187_A --> N187_B
  N188_A["parseJavaModule"]
  N188_B["maskJavaSource"]
  N188_A --> N188_B
  N189_A["parseJavaModule"]
  N189_B["stableId"]
  N189_A --> N189_B
  N190_A["extractClassBlocks"]
  N190_B["findMatchingBrace"]
  N190_A --> N190_B
  N191_A["extractClassUnit"]
  N191_B["buildMethodReturnTypeIndex"]
  N191_A --> N191_B
  N192_A["extractClassUnit"]
  N192_B["buildMethodUnit"]
  N192_A --> N192_B
  N193_A["extractClassUnit"]
  N193_B["extractClassResources"]
  N193_A --> N193_B
  N194_A["extractClassUnit"]
  N194_B["extractFieldTypes"]
  N194_A --> N194_B
  N195_A["extractClassUnit"]
  N195_B["extractMethodBlocks"]
  N195_A --> N195_B
  N196_A["extractClassUnit"]
  N196_B["locationFromOffsets"]
  N196_A --> N196_B
  N197_A["extractClassUnit"]
  N197_B["requestMappingPath"]
  N197_A --> N197_B
  N198_A["extractClassUnit"]
  N198_B["stableId"]
  N198_A --> N198_B
  N199_A["extractClassUnit"]
  N199_B["summarizeClass"]
  N199_A --> N199_B
  N200_A["extractClassResources"]
  N200_B["annotationAttribute"]
  N200_A --> N200_B
  N201_A["extractClassResources"]
  N201_B["annotationByName"]
  N201_A --> N201_B
  N202_A["extractClassResources"]
  N202_B["hasAnnotation"]
  N202_A --> N202_B
  N203_A["buildClassResourceIndex"]
  N203_B["extractClassResources"]
  N203_A --> N203_B
  N204_A["buildMethodReturnTypeIndex"]
  N204_B["normalizeJavaType"]
  N204_A --> N204_B
  N205_A["extractMethodBlocks"]
  N205_B["findMatchingBrace"]
  N205_A --> N205_B
  N206_A["extractMethodBlocks"]
  N206_B["leadingWhitespaceLength"]
  N206_A --> N206_B
  N207_A["extractMethodBlocks"]
  N207_B["parseMethodHeader"]
  N207_A --> N207_B
  N208_A["parseMethodHeader"]
  N208_B["parseParameters"]
  N208_A --> N208_B
  N209_A["parseMethodHeader"]
  N209_B["stripAnnotations"]
  N209_A --> N209_B
  N210_A["buildMethodUnit"]
  N210_B["buildReceiverTypeIndex"]
  N210_A --> N210_B
  N211_A["buildMethodUnit"]
  N211_B["locationFromOffsets"]
  N211_A --> N211_B
  N212_A["buildMethodUnit"]
  N212_B["stableId"]
  N212_A --> N212_B
  N213_A["extractCalls"]
  N213_B["normalizeReceiverCall"]
  N213_A --> N213_B
  N214_A["buildReceiverTypeIndex"]
  N214_B["extractLocalVariableTypes"]
  N214_A --> N214_B
  N215_A["buildReceiverTypeIndex"]
  N215_B["normalizeJavaType"]
  N215_A --> N215_B
  N216_A["extractResources"]
  N216_B["extractRepositoryOperationResources"]
  N216_A --> N216_B
  N217_A["extractResources"]
  N217_B["extractStringLiterals"]
  N217_A --> N217_B
  N218_A["extractRepositoryOperationResources"]
  N218_B["isPersistenceReceiver"]
  N218_A --> N218_B
  N219_A["extractRepositoryOperationResources"]
  N219_B["relatedResourcesForType"]
  N219_A --> N219_B
  N220_A["extractFrameworkHints"]
  N220_B["annotationAttribute"]
  N220_A --> N220_B
  N221_A["extractFrameworkHints"]
  N221_B["annotationByName"]
  N221_A --> N221_B
  N222_A["extractFrameworkHints"]
  N222_B["firstAnnotationString"]
  N222_A --> N222_B
  N223_A["extractFrameworkHints"]
  N223_B["hasAnnotation"]
  N223_A --> N223_B
  N224_A["extractFrameworkHints"]
  N224_B["routeFromAnnotations"]
  N224_A --> N224_B
  N225_A["extractEntrypointHints"]
  N225_B["hasAnnotation"]
  N225_A --> N225_B
  N226_A["routeFromAnnotations"]
  N226_B["annotationAttribute"]
  N226_A --> N226_B
  N227_A["routeFromAnnotations"]
  N227_B["annotationName"]
  N227_A --> N227_B
  N228_A["routeFromAnnotations"]
  N228_B["firstAnnotationString"]
  N228_A --> N228_B
  N229_A["routeFromAnnotations"]
  N229_B["joinRoutePaths"]
  N229_A --> N229_B
  N230_A["routeFromAnnotations"]
  N230_B["requestMappingMethod"]
  N230_A --> N230_B
  N231_A["requestMappingPath"]
  N231_B["annotationAttribute"]
  N231_A --> N231_B
  N232_A["requestMappingPath"]
  N232_B["annotationName"]
  N232_A --> N232_B
  N233_A["requestMappingPath"]
  N233_B["firstAnnotationString"]
  N233_A --> N233_B
  N234_A["parseParameters"]
  N234_B["splitTopLevel"]
  N234_A --> N234_B
  N235_A["parseParameters"]
  N235_B["stripAnnotations"]
  N235_A --> N235_B
  N236_A["extractFieldTypes"]
  N236_B["findMatchingBrace"]
  N236_A --> N236_B
  N237_A["extractFieldTypes"]
  N237_B["parseFieldStatement"]
  N237_A --> N237_B
  N238_A["extractLocalVariableTypes"]
  N238_B["normalizeJavaType"]
  N238_A --> N238_B
  N239_A["extractLocalVariableTypes"]
  N239_B["normalizeReceiverCall"]
  N239_A --> N239_B
  N240_A["parseFieldStatement"]
  N240_B["normalizeJavaType"]
  N240_A --> N240_B
  N241_A["parseFieldStatement"]
  N241_B["splitTopLevel"]
  N241_A --> N241_B
  N242_A["parseFieldStatement"]
  N242_B["stripAnnotations"]
  N242_A --> N242_B
  N243_A["hasAnnotation"]
  N243_B["annotationName"]
  N243_A --> N243_B
  N244_A["annotationByName"]
  N244_B["annotationName"]
  N244_A --> N244_B
  N245_A["locationFromOffsets"]
  N245_B["lineNumberAt"]
  N245_A --> N245_B
  N246_A["parseModules"]
  N246_B["findParserAdapter"]
  N246_A --> N246_B
  N247_A["parseModules"]
  N247_B["stableId"]
  N247_A --> N247_B
  N248_A["parseTypeScriptModule"]
  N248_B["extractFunctionUnit"]
  N248_A --> N248_B
  N249_A["parseTypeScriptModule"]
  N249_B["extractVariableFunctionUnit"]
  N249_A --> N249_B
  N250_A["parseTypeScriptModule"]
  N250_B["stableId"]
  N250_A --> N250_B
  N251_A["parseTypeScriptModule"]
  N251_B["summarizeModule"]
  N251_A --> N251_B
  N252_A["extractClassUnit"]
  N252_B["extractCallableUnit"]
  N252_A --> N252_B
  N253_A["extractClassUnit"]
  N253_B["getLocation"]
  N253_A --> N253_B
  N254_A["extractClassUnit"]
  N254_B["stableId"]
  N254_A --> N254_B
  N255_A["extractFunctionUnit"]
  N255_B["extractCallableUnit"]
  N255_A --> N255_B
  N256_A["extractVariableFunctionUnit"]
  N256_B["extractCallableUnit"]
  N256_A --> N256_B
  N257_A["extractCallableUnit"]
  N257_B["buildSignature"]
  N257_A --> N257_B
  N258_A["extractCallableUnit"]
  N258_B["extractParameters"]
  N258_A --> N258_B
  N259_A["extractCallableUnit"]
  N259_B["getLocation"]
  N259_A --> N259_B
  N260_A["extractCallableUnit"]
  N260_B["hasModifier"]
  N260_A --> N260_B
  N261_A["extractCallableUnit"]
  N261_B["isJavaScriptFile"]
  N261_A --> N261_B
  N262_A["extractCallableUnit"]
  N262_B["stableId"]
  N262_A --> N262_B
  N263_A["extractVisibility"]
  N263_B["hasModifier"]
  N263_A --> N263_B
  N264_A["extractCalls"]
  N264_B["formatCallExpression"]
  N264_A --> N264_B
  N265_A["extractFrameworkHints"]
  N265_B["literalText"]
  N265_A --> N265_B
  N266_A["extractFrameworkHints"]
  N266_B["parseHttpRouteCall"]
  N266_A --> N266_B
  N267_A["extractEntrypointHints"]
  N267_B["parseHttpRouteCall"]
  N267_A --> N267_B
  N268_A["parseHttpRouteCall"]
  N268_B["literalText"]
  N268_A --> N268_B
  N269_A["scanRepo"]
  N269_B["detectLanguage"]
  N269_A --> N269_B
  N270_A["scanRepo"]
  N270_B["matchesAnyExclude"]
  N270_A --> N270_B
  N271_A["scanRepo"]
  N271_B["toPosixPath"]
  N271_A --> N271_B
  N272_A["matchesAnyExclude"]
  N272_B["matchesExclude"]
  N272_A --> N272_B
  N273_A["matchesExclude"]
  N273_B["escapeRegex"]
  N273_A --> N273_B
  N274_A["matchesExclude"]
  N274_B["toPosixPath"]
  N274_A --> N274_B
  N275_A["readJson"]
  N275_B["readJsonAt"]
  N275_A --> N275_B
  N276_A["generateFixtureOutput"]
  N276_B["analyzeRepo"]
  N276_A --> N276_B
  N277_A["generateFixtureOutput"]
  N277_B["generateDocs"]
  N277_A --> N277_B
  N278_A["generateFixtureOutput"]
  N278_B["writeResultJson"]
  N278_A --> N278_B
  N279_A["assertSchema"]
  N279_B["assertSchema"]
  N279_A --> N279_B
  N280_A["assertSchema"]
  N280_B["typeOf"]
  N280_A --> N280_B
```

## Edges

| From | To | Call | Weight |
| --- | --- | --- | --- |
| scan | scan | scan | 1 |
| analyzeRepo | addSyntheticRepositoryMethods | addSyntheticRepositoryMethods | 1 |
| analyzeRepo | attachHeuristicSemantics | attachHeuristicSemantics | 1 |
| analyzeRepo | buildRelationGraph | buildRelationGraph | 1 |
| analyzeRepo | buildScanRuntimeInfo | buildScanRuntimeInfo | 1 |
| analyzeRepo | enrichModulesWithMethodSemantics | enrichModulesWithMethodSemantics | 1 |
| analyzeRepo | loadModelConfig | loadModelConfig | 1 |
| analyzeRepo | parseModules | parseModules | 1 |
| analyzeRepo | scanRepo | scanRepo | 1 |
| analyzeRepo | toModelRuntimeInfo | toModelRuntimeInfo | 1 |
| addSyntheticRepositoryMethods | buildSyntheticRepositoryMethod | buildSyntheticRepositoryMethod | 1 |
| addSyntheticRepositoryMethods | collectRepositoryOperations | collectRepositoryOperations | 1 |
| addSyntheticRepositoryMethods | indexRepositoryClasses | indexRepositoryClasses | 1 |
| collectRepositoryOperations | parseRepositoryCall | parseRepositoryCall | 1 |
| collectRepositoryOperations | parseRepositoryResource | parseRepositoryResource | 1 |
| buildSyntheticRepositoryMethod | stableId | stableId | 1 |
| buildSyntheticRepositoryMethod | syntheticParameters | syntheticParameters | 1 |
| buildSyntheticRepositoryMethod | syntheticReturnType | syntheticReturnType | 1 |
| loadProjectConfig | rejectSensitiveKeys | rejectSensitiveKeys | 1 |
| rejectSensitiveKeys | rejectSensitiveKeys | rejectSensitiveKeys | 1 |
| generateDocs | buildQualitySummary | buildQualitySummary | 1 |
| generateDocs | buildSemanticOverview | buildSemanticOverview | 1 |
| generateDocs | composeProjectNarrative | composeProjectNarrative | 1 |
| generateDocs | renderArchitecture | renderArchitecture | 1 |
| generateDocs | renderBusinessFlows | renderBusinessFlows | 1 |
| generateDocs | renderCallGraph | renderCallGraph | 1 |
| generateDocs | renderDataAndResources | renderDataAndResources | 1 |
| generateDocs | renderDocIndex | renderDocIndex | 1 |
| generateDocs | renderEntrypoints | renderEntrypoints | 1 |
| generateDocs | renderExecutionFlows | renderExecutionFlows | 1 |
| generateDocs | renderMaintenanceGuide | renderMaintenanceGuide | 1 |
| generateDocs | renderModules | renderModules | 1 |
| generateDocs | renderProjectOverview | renderProjectOverview | 1 |
| generateDocs | renderQualityReport | renderQualityReport | 1 |
| renderDocIndex | bulletList | bulletList | 1 |
| renderDocIndex | heading | heading | 1 |
| renderDocIndex | isInternalResource | isInternalResource | 1 |
| renderDocIndex | numberedList | numberedList | 1 |
| renderDocIndex | table | table | 1 |
| renderProjectOverview | bulletList | bulletList | 1 |
| renderProjectOverview | heading | heading | 1 |
| renderProjectOverview | isInternalResource | isInternalResource | 1 |
| renderProjectOverview | numberedList | numberedList | 1 |
| renderProjectOverview | table | table | 1 |
| renderArchitecture | bulletList | bulletList | 1 |
| renderArchitecture | formatMethodName | formatMethodName | 1 |
| renderArchitecture | heading | heading | 1 |
| renderArchitecture | isInternalResource | isInternalResource | 1 |
| renderArchitecture | table | table | 1 |
| renderModules | bulletList | bulletList | 1 |
| renderModules | formatMethodHints | formatMethodHints | 1 |
| renderModules | heading | heading | 1 |
| renderModules | selectHighSignalMethods | selectHighSignalMethods | 1 |
| renderModules | table | table | 1 |
| selectHighSignalMethods | scoreMethodForModuleDocs | scoreMethodForModuleDocs | 1 |
| renderCallGraph | escapeMermaid | escapeMermaid | 1 |
| renderCallGraph | heading | heading | 1 |
| renderCallGraph | table | table | 1 |
| renderExecutionFlows | bulletList | bulletList | 1 |
| renderExecutionFlows | formatMethodName | formatMethodName | 1 |
| renderExecutionFlows | heading | heading | 1 |
| renderBusinessFlows | bulletList | bulletList | 1 |
| renderBusinessFlows | formatMethodName | formatMethodName | 1 |
| renderBusinessFlows | heading | heading | 1 |
| renderBusinessFlows | matchingNarrativeFlow | matchingNarrativeFlow | 1 |
| renderBusinessFlows | numberedList | numberedList | 1 |
| renderBusinessFlows | table | table | 1 |
| renderEntrypoints | formatMethodName | formatMethodName | 1 |
| renderEntrypoints | heading | heading | 1 |
| renderEntrypoints | table | table | 1 |
| renderDataAndResources | heading | heading | 1 |
| renderDataAndResources | isInternalResource | isInternalResource | 1 |
| renderDataAndResources | table | table | 1 |
| renderMaintenanceGuide | bulletList | bulletList | 1 |
| renderMaintenanceGuide | heading | heading | 1 |
| renderMaintenanceGuide | table | table | 1 |
| composeProjectNarrative | NarrativeCache#open | NarrativeCache.open | 1 |
| composeProjectNarrative | buildNarrativeContext | buildNarrativeContext | 1 |
| composeProjectNarrative | buildNarrativePrompt | buildNarrativePrompt | 1 |
| composeProjectNarrative | createChatModel | createChatModel | 3 |
| composeProjectNarrative | fallbackNarrative | fallbackNarrative | 1 |
| composeProjectNarrative | parseNarrativeResponse | parseNarrativeResponse | 1 |
| fallbackNarrative | fallbackOperatingModel | fallbackOperatingModel | 1 |
| renderQualityReport | buildQualitySummary | buildQualitySummary | 1 |
| renderQualityReport | bulletList | bulletList | 1 |
| renderQualityReport | heading | heading | 1 |
| renderQualityReport | table | table | 1 |
| buildQualitySummary | buildChecks | buildChecks | 1 |
| buildQualitySummary | calculateScore | calculateScore | 1 |
| buildQualitySummary | recommendations | recommendations | 1 |
| buildChecks | countMatches | countMatches | 1 |
| buildChecks | hasRequiredDocs | hasRequiredDocs | 1 |
| buildChecks | isChineseNarrative | isChineseNarrative | 1 |
| buildChecks | maxDocLength | maxDocLength | 1 |
| buildChecks | methodSummaryCoverageCheck | methodSummaryCoverageCheck | 1 |
| buildSemanticOverview | buildBusinessFlows | buildBusinessFlows | 1 |
| buildSemanticOverview | buildFlows | buildFlows | 1 |
| buildSemanticOverview | buildResourceUsage | buildResourceUsage | 1 |
| buildSemanticOverview | countEdges | countEdges | 1 |
| buildSemanticOverview | groupModules | groupModules | 1 |
| buildSemanticOverview | inferPurpose | inferPurpose | 1 |
| buildBusinessFlows | formatMethodName | formatMethodName | 1 |
| buildBusinessFlows | walkFlow | walkFlow | 1 |
| groupModules | inferGroupName | inferGroupName | 1 |
| groupModules | summarizeGroup | summarizeGroup | 1 |
| groupModules | summarizeResponsibilities | summarizeResponsibilities | 1 |
| inferGroupName | inferJavaGroupName | inferJavaGroupName | 1 |
| inferPurpose | collectResourceNames | collectResourceNames | 1 |
| inferPurpose | formatChineseList | formatChineseList | 1 |
| buildFlows | formatMethodName | formatMethodName | 1 |
| buildFlows | walkFlow | walkFlow | 1 |
| buildResourceUsage | isInternalResource | isInternalResource | 1 |
| buildRelationGraph | buildMethodNameIndex | buildMethodNameIndex | 1 |
| buildRelationGraph | dedupeEdges | dedupeEdges | 1 |
| buildRelationGraph | relationKindForResource | relationKindForResource | 1 |
| buildRelationGraph | resolveCallTarget | resolveCallTarget | 1 |
| buildRelationGraph | scoreCall | scoreCall | 1 |
| buildRelationGraph | stableId | stableId | 1 |
| extractResources | resourceKind | resourceKind | 1 |
| extractResources | stableId | stableId | 1 |
| main | analyzeRepo | analyzeRepo | 1 |
| main | generateDocs | generateDocs | 1 |
| main | loadModelConfig | loadModelConfig | 1 |
| main | loadProjectConfig | loadProjectConfig | 1 |
| main | parseArgs | parseArgs | 1 |
| main | printHelp | printHelp | 1 |
| main | writeResultJson | writeResultJson | 3 |
| parseArgs | requireValue | requireValue | 1 |
| enrichModulesWithMethodSemantics | MethodSemanticCache#open | MethodSemanticCache.open | 1 |
| enrichModulesWithMethodSemantics | analyzeMethodWithLlm | analyzeMethodWithLlm | 1 |
| enrichModulesWithMethodSemantics | createChatModel | createChatModel | 3 |
| enrichModulesWithMethodSemantics | formatError | formatError | 1 |
| enrichModulesWithMethodSemantics | heuristicSemantic | heuristicSemantic | 1 |
| enrichModulesWithMethodSemantics | mapWithConcurrency | mapWithConcurrency | 1 |
| enrichModulesWithMethodSemantics | summarizeModuleFromMethods | summarizeModuleFromMethods | 1 |
| attachHeuristicSemantics | heuristicSemantic | heuristicSemantic | 1 |
| analyzeMethodWithLlm | buildPrompt | buildPrompt | 1 |
| analyzeMethodWithLlm | parseModelResponse | parseModelResponse | 1 |
| parseModelResponse | normalizeSemantic | normalizeSemantic | 1 |
| buildPrompt | trimSource | trimSource | 1 |
| loadModelConfig | defaultBaseUrl | defaultBaseUrl | 1 |
| loadModelConfig | defaultModel | defaultModel | 1 |
| loadModelConfig | getApiKey | getApiKey | 1 |
| loadModelConfig | parseInteger | parseInteger | 1 |
| loadModelConfig | parseNumber | parseNumber | 1 |
| loadModelConfig | parseOptionalInteger | parseOptionalInteger | 1 |
| writeResultJson | buildResultDiff | buildResultDiff | 1 |
| writeResultJson | renderChangeSummary | renderChangeSummary | 1 |
| writeResultJson | toResultJson | toResultJson | 1 |
| toResultJson | toPosixPath | toPosixPath | 1 |
| serializeEntrypoint | methodRef | methodRef | 1 |
| serializeFlow | methodRef | methodRef | 1 |
| serializeBusinessFlow | methodRef | methodRef | 1 |
| methodRef | formatMethodName | formatMethodName | 1 |
| buildResultDiff | businessFlows | businessFlows | 1 |
| buildResultDiff | diffByKey | diffByKey | 1 |
| buildResultDiff | emptyBaselineDiff | emptyBaselineDiff | 1 |
| buildResultDiff | entrypoints | entrypoints | 1 |
| buildResultDiff | files | files | 1 |
| buildResultDiff | methods | methods | 1 |
| buildResultDiff | qualityScore | qualityScore | 1 |
| buildResultDiff | resources | resources | 1 |
| buildResultDiff | stableStringify | stableStringify | 1 |
| buildResultDiff | stringField | stringField | 1 |
| emptyBaselineDiff | emptyChangeSet | emptyChangeSet | 1 |
| emptyBaselineDiff | qualityScore | qualityScore | 1 |
| emptyBaselineDiff | stringField | stringField | 1 |
| files | arrayField | arrayField | 1 |
| files | numberValue | numberValue | 1 |
| files | stringValue | stringValue | 1 |
| methods | arrayField | arrayField | 1 |
| methods | stringValue | stringValue | 1 |
| entrypoints | arrayField | arrayField | 1 |
| entrypoints | methods | methods | 1 |
| entrypoints | stringValue | stringValue | 1 |
| resources | arrayField | arrayField | 1 |
| businessFlows | arrayField | arrayField | 1 |
| businessFlows | objectField | objectField | 1 |
| renderChangeSummary | renderEntrypointList | renderEntrypointList | 1 |
| renderChangeSummary | renderMethodList | renderMethodList | 1 |
| renderChangeSummary | renderStringChange | renderStringChange | 1 |
| qualityScore | numberValue | numberValue | 1 |
| qualityScore | objectField | objectField | 1 |
| stringField | stringValue | stringValue | 1 |
| stableStringify | stableStringify | stableStringify | 1 |
| parseJavaModule | buildClassResourceIndex | buildClassResourceIndex | 1 |
| parseJavaModule | buildLineIndex | buildLineIndex | 1 |
| parseJavaModule | extractClassBlocks | extractClassBlocks | 1 |
| parseJavaModule | maskJavaSource | maskJavaSource | 1 |
| parseJavaModule | stableId | stableId | 1 |
| extractClassBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractClassUnit | buildMethodReturnTypeIndex | buildMethodReturnTypeIndex | 1 |
| extractClassUnit | buildMethodUnit | buildMethodUnit | 1 |
| extractClassUnit | extractClassResources | extractClassResources | 1 |
| extractClassUnit | extractFieldTypes | extractFieldTypes | 1 |
| extractClassUnit | extractMethodBlocks | extractMethodBlocks | 1 |
| extractClassUnit | locationFromOffsets | locationFromOffsets | 1 |
| extractClassUnit | requestMappingPath | requestMappingPath | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractClassUnit | summarizeClass | summarizeClass | 1 |
| extractClassResources | annotationAttribute | annotationAttribute | 1 |
| extractClassResources | annotationByName | annotationByName | 1 |
| extractClassResources | hasAnnotation | hasAnnotation | 1 |
| buildClassResourceIndex | extractClassResources | extractClassResources | 1 |
| buildMethodReturnTypeIndex | normalizeJavaType | normalizeJavaType | 1 |
| extractMethodBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractMethodBlocks | leadingWhitespaceLength | leadingWhitespaceLength | 1 |
| extractMethodBlocks | parseMethodHeader | parseMethodHeader | 1 |
| parseMethodHeader | parseParameters | parseParameters | 1 |
| parseMethodHeader | stripAnnotations | stripAnnotations | 1 |
| buildMethodUnit | buildReceiverTypeIndex | buildReceiverTypeIndex | 1 |
| buildMethodUnit | locationFromOffsets | locationFromOffsets | 1 |
| buildMethodUnit | stableId | stableId | 1 |
| extractCalls | normalizeReceiverCall | normalizeReceiverCall | 1 |
| buildReceiverTypeIndex | extractLocalVariableTypes | extractLocalVariableTypes | 1 |
| buildReceiverTypeIndex | normalizeJavaType | normalizeJavaType | 1 |
| extractResources | extractRepositoryOperationResources | extractRepositoryOperationResources | 1 |
| extractResources | extractStringLiterals | extractStringLiterals | 1 |
| extractRepositoryOperationResources | isPersistenceReceiver | isPersistenceReceiver | 1 |
| extractRepositoryOperationResources | relatedResourcesForType | relatedResourcesForType | 1 |
| extractFrameworkHints | annotationAttribute | annotationAttribute | 1 |
| extractFrameworkHints | annotationByName | annotationByName | 1 |
| extractFrameworkHints | firstAnnotationString | firstAnnotationString | 1 |
| extractFrameworkHints | hasAnnotation | hasAnnotation | 1 |
| extractFrameworkHints | routeFromAnnotations | routeFromAnnotations | 1 |
| extractEntrypointHints | hasAnnotation | hasAnnotation | 1 |
| routeFromAnnotations | annotationAttribute | annotationAttribute | 1 |
| routeFromAnnotations | annotationName | annotationName | 1 |
| routeFromAnnotations | firstAnnotationString | firstAnnotationString | 1 |
| routeFromAnnotations | joinRoutePaths | joinRoutePaths | 1 |
| routeFromAnnotations | requestMappingMethod | requestMappingMethod | 1 |
| requestMappingPath | annotationAttribute | annotationAttribute | 1 |
| requestMappingPath | annotationName | annotationName | 1 |
| requestMappingPath | firstAnnotationString | firstAnnotationString | 1 |
| parseParameters | splitTopLevel | splitTopLevel | 1 |
| parseParameters | stripAnnotations | stripAnnotations | 1 |
| extractFieldTypes | findMatchingBrace | findMatchingBrace | 1 |
| extractFieldTypes | parseFieldStatement | parseFieldStatement | 1 |
| extractLocalVariableTypes | normalizeJavaType | normalizeJavaType | 1 |
| extractLocalVariableTypes | normalizeReceiverCall | normalizeReceiverCall | 1 |
| parseFieldStatement | normalizeJavaType | normalizeJavaType | 1 |
| parseFieldStatement | splitTopLevel | splitTopLevel | 1 |
| parseFieldStatement | stripAnnotations | stripAnnotations | 1 |
| hasAnnotation | annotationName | annotationName | 1 |
| annotationByName | annotationName | annotationName | 1 |
| locationFromOffsets | lineNumberAt | lineNumberAt | 1 |
| parseModules | findParserAdapter | findParserAdapter | 1 |
| parseModules | stableId | stableId | 1 |
| parseTypeScriptModule | extractFunctionUnit | extractFunctionUnit | 1 |
| parseTypeScriptModule | extractVariableFunctionUnit | extractVariableFunctionUnit | 1 |
| parseTypeScriptModule | stableId | stableId | 1 |
| parseTypeScriptModule | summarizeModule | summarizeModule | 1 |
| extractClassUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractClassUnit | getLocation | getLocation | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractFunctionUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractVariableFunctionUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractCallableUnit | buildSignature | buildSignature | 1 |
| extractCallableUnit | extractParameters | extractParameters | 1 |
| extractCallableUnit | getLocation | getLocation | 1 |
| extractCallableUnit | hasModifier | hasModifier | 1 |
| extractCallableUnit | isJavaScriptFile | isJavaScriptFile | 1 |
| extractCallableUnit | stableId | stableId | 1 |
| extractVisibility | hasModifier | hasModifier | 1 |
| extractCalls | formatCallExpression | formatCallExpression | 1 |
| extractFrameworkHints | literalText | literalText | 1 |
| extractFrameworkHints | parseHttpRouteCall | parseHttpRouteCall | 1 |
| extractEntrypointHints | parseHttpRouteCall | parseHttpRouteCall | 1 |
| parseHttpRouteCall | literalText | literalText | 1 |
| scanRepo | detectLanguage | detectLanguage | 1 |
| scanRepo | matchesAnyExclude | matchesAnyExclude | 1 |
| scanRepo | toPosixPath | toPosixPath | 1 |
| matchesAnyExclude | matchesExclude | matchesExclude | 1 |
| matchesExclude | escapeRegex | escapeRegex | 1 |
| matchesExclude | toPosixPath | toPosixPath | 1 |
| readJson | readJsonAt | readJsonAt | 1 |
| generateFixtureOutput | analyzeRepo | analyzeRepo | 1 |
| generateFixtureOutput | generateDocs | generateDocs | 1 |
| generateFixtureOutput | writeResultJson | writeResultJson | 3 |
| assertSchema | assertSchema | assertSchema | 1 |
| assertSchema | typeOf | typeOf | 1 |
