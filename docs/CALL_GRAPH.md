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
  N27_B["renderEntrypoints"]
  N27_A --> N27_B
  N28_A["generateDocs"]
  N28_B["renderExecutionFlows"]
  N28_A --> N28_B
  N29_A["generateDocs"]
  N29_B["renderMaintenanceGuide"]
  N29_A --> N29_B
  N30_A["generateDocs"]
  N30_B["renderModules"]
  N30_A --> N30_B
  N31_A["generateDocs"]
  N31_B["renderProjectOverview"]
  N31_A --> N31_B
  N32_A["generateDocs"]
  N32_B["renderQualityReport"]
  N32_A --> N32_B
  N33_A["renderProjectOverview"]
  N33_B["bulletList"]
  N33_A --> N33_B
  N34_A["renderProjectOverview"]
  N34_B["heading"]
  N34_A --> N34_B
  N35_A["renderProjectOverview"]
  N35_B["isInternalResource"]
  N35_A --> N35_B
  N36_A["renderProjectOverview"]
  N36_B["numberedList"]
  N36_A --> N36_B
  N37_A["renderProjectOverview"]
  N37_B["table"]
  N37_A --> N37_B
  N38_A["renderArchitecture"]
  N38_B["bulletList"]
  N38_A --> N38_B
  N39_A["renderArchitecture"]
  N39_B["formatMethodName"]
  N39_A --> N39_B
  N40_A["renderArchitecture"]
  N40_B["heading"]
  N40_A --> N40_B
  N41_A["renderArchitecture"]
  N41_B["isInternalResource"]
  N41_A --> N41_B
  N42_A["renderArchitecture"]
  N42_B["table"]
  N42_A --> N42_B
  N43_A["renderModules"]
  N43_B["bulletList"]
  N43_A --> N43_B
  N44_A["renderModules"]
  N44_B["formatMethodHints"]
  N44_A --> N44_B
  N45_A["renderModules"]
  N45_B["heading"]
  N45_A --> N45_B
  N46_A["renderModules"]
  N46_B["selectHighSignalMethods"]
  N46_A --> N46_B
  N47_A["renderModules"]
  N47_B["table"]
  N47_A --> N47_B
  N48_A["selectHighSignalMethods"]
  N48_B["scoreMethodForModuleDocs"]
  N48_A --> N48_B
  N49_A["renderCallGraph"]
  N49_B["escapeMermaid"]
  N49_A --> N49_B
  N50_A["renderCallGraph"]
  N50_B["heading"]
  N50_A --> N50_B
  N51_A["renderCallGraph"]
  N51_B["table"]
  N51_A --> N51_B
  N52_A["renderExecutionFlows"]
  N52_B["bulletList"]
  N52_A --> N52_B
  N53_A["renderExecutionFlows"]
  N53_B["formatMethodName"]
  N53_A --> N53_B
  N54_A["renderExecutionFlows"]
  N54_B["heading"]
  N54_A --> N54_B
  N55_A["renderBusinessFlows"]
  N55_B["bulletList"]
  N55_A --> N55_B
  N56_A["renderBusinessFlows"]
  N56_B["formatMethodName"]
  N56_A --> N56_B
  N57_A["renderBusinessFlows"]
  N57_B["heading"]
  N57_A --> N57_B
  N58_A["renderBusinessFlows"]
  N58_B["matchingNarrativeFlow"]
  N58_A --> N58_B
  N59_A["renderBusinessFlows"]
  N59_B["numberedList"]
  N59_A --> N59_B
  N60_A["renderBusinessFlows"]
  N60_B["table"]
  N60_A --> N60_B
  N61_A["renderEntrypoints"]
  N61_B["formatMethodName"]
  N61_A --> N61_B
  N62_A["renderEntrypoints"]
  N62_B["heading"]
  N62_A --> N62_B
  N63_A["renderEntrypoints"]
  N63_B["table"]
  N63_A --> N63_B
  N64_A["renderDataAndResources"]
  N64_B["heading"]
  N64_A --> N64_B
  N65_A["renderDataAndResources"]
  N65_B["isInternalResource"]
  N65_A --> N65_B
  N66_A["renderDataAndResources"]
  N66_B["table"]
  N66_A --> N66_B
  N67_A["renderMaintenanceGuide"]
  N67_B["bulletList"]
  N67_A --> N67_B
  N68_A["renderMaintenanceGuide"]
  N68_B["heading"]
  N68_A --> N68_B
  N69_A["renderMaintenanceGuide"]
  N69_B["table"]
  N69_A --> N69_B
  N70_A["composeProjectNarrative"]
  N70_B["NarrativeCache#open"]
  N70_A --> N70_B
  N71_A["composeProjectNarrative"]
  N71_B["buildNarrativeContext"]
  N71_A --> N71_B
  N72_A["composeProjectNarrative"]
  N72_B["buildNarrativePrompt"]
  N72_A --> N72_B
  N73_A["composeProjectNarrative"]
  N73_B["createChatModel"]
  N73_A --> N73_B
  N74_A["composeProjectNarrative"]
  N74_B["fallbackNarrative"]
  N74_A --> N74_B
  N75_A["composeProjectNarrative"]
  N75_B["parseNarrativeResponse"]
  N75_A --> N75_B
  N76_A["fallbackNarrative"]
  N76_B["fallbackOperatingModel"]
  N76_A --> N76_B
  N77_A["renderQualityReport"]
  N77_B["buildQualitySummary"]
  N77_A --> N77_B
  N78_A["renderQualityReport"]
  N78_B["bulletList"]
  N78_A --> N78_B
  N79_A["renderQualityReport"]
  N79_B["heading"]
  N79_A --> N79_B
  N80_A["renderQualityReport"]
  N80_B["table"]
  N80_A --> N80_B
  N81_A["buildQualitySummary"]
  N81_B["buildChecks"]
  N81_A --> N81_B
  N82_A["buildQualitySummary"]
  N82_B["calculateScore"]
  N82_A --> N82_B
  N83_A["buildQualitySummary"]
  N83_B["recommendations"]
  N83_A --> N83_B
  N84_A["buildChecks"]
  N84_B["countMatches"]
  N84_A --> N84_B
  N85_A["buildChecks"]
  N85_B["hasRequiredDocs"]
  N85_A --> N85_B
  N86_A["buildChecks"]
  N86_B["isChineseNarrative"]
  N86_A --> N86_B
  N87_A["buildChecks"]
  N87_B["maxDocLength"]
  N87_A --> N87_B
  N88_A["buildSemanticOverview"]
  N88_B["buildBusinessFlows"]
  N88_A --> N88_B
  N89_A["buildSemanticOverview"]
  N89_B["buildFlows"]
  N89_A --> N89_B
  N90_A["buildSemanticOverview"]
  N90_B["buildResourceUsage"]
  N90_A --> N90_B
  N91_A["buildSemanticOverview"]
  N91_B["countEdges"]
  N91_A --> N91_B
  N92_A["buildSemanticOverview"]
  N92_B["groupModules"]
  N92_A --> N92_B
  N93_A["buildSemanticOverview"]
  N93_B["inferPurpose"]
  N93_A --> N93_B
  N94_A["buildBusinessFlows"]
  N94_B["formatMethodName"]
  N94_A --> N94_B
  N95_A["buildBusinessFlows"]
  N95_B["walkFlow"]
  N95_A --> N95_B
  N96_A["groupModules"]
  N96_B["inferGroupName"]
  N96_A --> N96_B
  N97_A["groupModules"]
  N97_B["summarizeGroup"]
  N97_A --> N97_B
  N98_A["groupModules"]
  N98_B["summarizeResponsibilities"]
  N98_A --> N98_B
  N99_A["inferGroupName"]
  N99_B["inferJavaGroupName"]
  N99_A --> N99_B
  N100_A["inferPurpose"]
  N100_B["collectResourceNames"]
  N100_A --> N100_B
  N101_A["inferPurpose"]
  N101_B["formatChineseList"]
  N101_A --> N101_B
  N102_A["buildFlows"]
  N102_B["formatMethodName"]
  N102_A --> N102_B
  N103_A["buildFlows"]
  N103_B["walkFlow"]
  N103_A --> N103_B
  N104_A["buildResourceUsage"]
  N104_B["isInternalResource"]
  N104_A --> N104_B
  N105_A["buildRelationGraph"]
  N105_B["buildMethodNameIndex"]
  N105_A --> N105_B
  N106_A["buildRelationGraph"]
  N106_B["dedupeEdges"]
  N106_A --> N106_B
  N107_A["buildRelationGraph"]
  N107_B["relationKindForResource"]
  N107_A --> N107_B
  N108_A["buildRelationGraph"]
  N108_B["resolveCallTarget"]
  N108_A --> N108_B
  N109_A["buildRelationGraph"]
  N109_B["scoreCall"]
  N109_A --> N109_B
  N110_A["buildRelationGraph"]
  N110_B["stableId"]
  N110_A --> N110_B
  N111_A["extractResources"]
  N111_B["resourceKind"]
  N111_A --> N111_B
  N112_A["extractResources"]
  N112_B["stableId"]
  N112_A --> N112_B
  N113_A["main"]
  N113_B["analyzeRepo"]
  N113_A --> N113_B
  N114_A["main"]
  N114_B["generateDocs"]
  N114_A --> N114_B
  N115_A["main"]
  N115_B["loadModelConfig"]
  N115_A --> N115_B
  N116_A["main"]
  N116_B["loadProjectConfig"]
  N116_A --> N116_B
  N117_A["main"]
  N117_B["parseArgs"]
  N117_A --> N117_B
  N118_A["main"]
  N118_B["printHelp"]
  N118_A --> N118_B
  N119_A["main"]
  N119_B["writeResultJson"]
  N119_A --> N119_B
  N120_A["parseArgs"]
  N120_B["requireValue"]
  N120_A --> N120_B
  N121_A["enrichModulesWithMethodSemantics"]
  N121_B["MethodSemanticCache#open"]
  N121_A --> N121_B
  N122_A["enrichModulesWithMethodSemantics"]
  N122_B["analyzeMethodWithLlm"]
  N122_A --> N122_B
  N123_A["enrichModulesWithMethodSemantics"]
  N123_B["createChatModel"]
  N123_A --> N123_B
  N124_A["enrichModulesWithMethodSemantics"]
  N124_B["formatError"]
  N124_A --> N124_B
  N125_A["enrichModulesWithMethodSemantics"]
  N125_B["heuristicSemantic"]
  N125_A --> N125_B
  N126_A["enrichModulesWithMethodSemantics"]
  N126_B["mapWithConcurrency"]
  N126_A --> N126_B
  N127_A["enrichModulesWithMethodSemantics"]
  N127_B["summarizeModuleFromMethods"]
  N127_A --> N127_B
  N128_A["attachHeuristicSemantics"]
  N128_B["heuristicSemantic"]
  N128_A --> N128_B
  N129_A["analyzeMethodWithLlm"]
  N129_B["buildPrompt"]
  N129_A --> N129_B
  N130_A["analyzeMethodWithLlm"]
  N130_B["parseModelResponse"]
  N130_A --> N130_B
  N131_A["parseModelResponse"]
  N131_B["normalizeSemantic"]
  N131_A --> N131_B
  N132_A["buildPrompt"]
  N132_B["trimSource"]
  N132_A --> N132_B
  N133_A["loadModelConfig"]
  N133_B["defaultBaseUrl"]
  N133_A --> N133_B
  N134_A["loadModelConfig"]
  N134_B["defaultModel"]
  N134_A --> N134_B
  N135_A["loadModelConfig"]
  N135_B["getApiKey"]
  N135_A --> N135_B
  N136_A["loadModelConfig"]
  N136_B["parseInteger"]
  N136_A --> N136_B
  N137_A["loadModelConfig"]
  N137_B["parseNumber"]
  N137_A --> N137_B
  N138_A["loadModelConfig"]
  N138_B["parseOptionalInteger"]
  N138_A --> N138_B
  N139_A["writeResultJson"]
  N139_B["buildResultDiff"]
  N139_A --> N139_B
  N140_A["writeResultJson"]
  N140_B["renderChangeSummary"]
  N140_A --> N140_B
  N141_A["writeResultJson"]
  N141_B["toResultJson"]
  N141_A --> N141_B
  N142_A["toResultJson"]
  N142_B["toPosixPath"]
  N142_A --> N142_B
  N143_A["serializeEntrypoint"]
  N143_B["methodRef"]
  N143_A --> N143_B
  N144_A["serializeFlow"]
  N144_B["methodRef"]
  N144_A --> N144_B
  N145_A["serializeBusinessFlow"]
  N145_B["methodRef"]
  N145_A --> N145_B
  N146_A["methodRef"]
  N146_B["formatMethodName"]
  N146_A --> N146_B
  N147_A["buildResultDiff"]
  N147_B["businessFlows"]
  N147_A --> N147_B
  N148_A["buildResultDiff"]
  N148_B["diffByKey"]
  N148_A --> N148_B
  N149_A["buildResultDiff"]
  N149_B["emptyBaselineDiff"]
  N149_A --> N149_B
  N150_A["buildResultDiff"]
  N150_B["entrypoints"]
  N150_A --> N150_B
  N151_A["buildResultDiff"]
  N151_B["files"]
  N151_A --> N151_B
  N152_A["buildResultDiff"]
  N152_B["methods"]
  N152_A --> N152_B
  N153_A["buildResultDiff"]
  N153_B["qualityScore"]
  N153_A --> N153_B
  N154_A["buildResultDiff"]
  N154_B["resources"]
  N154_A --> N154_B
  N155_A["buildResultDiff"]
  N155_B["stableStringify"]
  N155_A --> N155_B
  N156_A["buildResultDiff"]
  N156_B["stringField"]
  N156_A --> N156_B
  N157_A["emptyBaselineDiff"]
  N157_B["emptyChangeSet"]
  N157_A --> N157_B
  N158_A["emptyBaselineDiff"]
  N158_B["qualityScore"]
  N158_A --> N158_B
  N159_A["emptyBaselineDiff"]
  N159_B["stringField"]
  N159_A --> N159_B
  N160_A["files"]
  N160_B["arrayField"]
  N160_A --> N160_B
  N161_A["files"]
  N161_B["numberValue"]
  N161_A --> N161_B
  N162_A["files"]
  N162_B["stringValue"]
  N162_A --> N162_B
  N163_A["methods"]
  N163_B["arrayField"]
  N163_A --> N163_B
  N164_A["methods"]
  N164_B["stringValue"]
  N164_A --> N164_B
  N165_A["entrypoints"]
  N165_B["arrayField"]
  N165_A --> N165_B
  N166_A["entrypoints"]
  N166_B["methods"]
  N166_A --> N166_B
  N167_A["entrypoints"]
  N167_B["stringValue"]
  N167_A --> N167_B
  N168_A["resources"]
  N168_B["arrayField"]
  N168_A --> N168_B
  N169_A["businessFlows"]
  N169_B["arrayField"]
  N169_A --> N169_B
  N170_A["businessFlows"]
  N170_B["objectField"]
  N170_A --> N170_B
  N171_A["renderChangeSummary"]
  N171_B["renderEntrypointList"]
  N171_A --> N171_B
  N172_A["renderChangeSummary"]
  N172_B["renderMethodList"]
  N172_A --> N172_B
  N173_A["renderChangeSummary"]
  N173_B["renderStringChange"]
  N173_A --> N173_B
  N174_A["qualityScore"]
  N174_B["numberValue"]
  N174_A --> N174_B
  N175_A["qualityScore"]
  N175_B["objectField"]
  N175_A --> N175_B
  N176_A["stringField"]
  N176_B["stringValue"]
  N176_A --> N176_B
  N177_A["stableStringify"]
  N177_B["stableStringify"]
  N177_A --> N177_B
  N178_A["parseJavaModule"]
  N178_B["buildClassResourceIndex"]
  N178_A --> N178_B
  N179_A["parseJavaModule"]
  N179_B["buildLineIndex"]
  N179_A --> N179_B
  N180_A["parseJavaModule"]
  N180_B["extractClassBlocks"]
  N180_A --> N180_B
  N181_A["parseJavaModule"]
  N181_B["maskJavaSource"]
  N181_A --> N181_B
  N182_A["parseJavaModule"]
  N182_B["stableId"]
  N182_A --> N182_B
  N183_A["extractClassBlocks"]
  N183_B["findMatchingBrace"]
  N183_A --> N183_B
  N184_A["extractClassUnit"]
  N184_B["buildMethodReturnTypeIndex"]
  N184_A --> N184_B
  N185_A["extractClassUnit"]
  N185_B["buildMethodUnit"]
  N185_A --> N185_B
  N186_A["extractClassUnit"]
  N186_B["extractClassResources"]
  N186_A --> N186_B
  N187_A["extractClassUnit"]
  N187_B["extractFieldTypes"]
  N187_A --> N187_B
  N188_A["extractClassUnit"]
  N188_B["extractMethodBlocks"]
  N188_A --> N188_B
  N189_A["extractClassUnit"]
  N189_B["locationFromOffsets"]
  N189_A --> N189_B
  N190_A["extractClassUnit"]
  N190_B["requestMappingPath"]
  N190_A --> N190_B
  N191_A["extractClassUnit"]
  N191_B["stableId"]
  N191_A --> N191_B
  N192_A["extractClassUnit"]
  N192_B["summarizeClass"]
  N192_A --> N192_B
  N193_A["extractClassResources"]
  N193_B["annotationAttribute"]
  N193_A --> N193_B
  N194_A["extractClassResources"]
  N194_B["annotationByName"]
  N194_A --> N194_B
  N195_A["extractClassResources"]
  N195_B["hasAnnotation"]
  N195_A --> N195_B
  N196_A["buildClassResourceIndex"]
  N196_B["extractClassResources"]
  N196_A --> N196_B
  N197_A["buildMethodReturnTypeIndex"]
  N197_B["normalizeJavaType"]
  N197_A --> N197_B
  N198_A["extractMethodBlocks"]
  N198_B["findMatchingBrace"]
  N198_A --> N198_B
  N199_A["extractMethodBlocks"]
  N199_B["leadingWhitespaceLength"]
  N199_A --> N199_B
  N200_A["extractMethodBlocks"]
  N200_B["parseMethodHeader"]
  N200_A --> N200_B
  N201_A["parseMethodHeader"]
  N201_B["parseParameters"]
  N201_A --> N201_B
  N202_A["parseMethodHeader"]
  N202_B["stripAnnotations"]
  N202_A --> N202_B
  N203_A["buildMethodUnit"]
  N203_B["buildReceiverTypeIndex"]
  N203_A --> N203_B
  N204_A["buildMethodUnit"]
  N204_B["locationFromOffsets"]
  N204_A --> N204_B
  N205_A["buildMethodUnit"]
  N205_B["stableId"]
  N205_A --> N205_B
  N206_A["extractCalls"]
  N206_B["normalizeReceiverCall"]
  N206_A --> N206_B
  N207_A["buildReceiverTypeIndex"]
  N207_B["extractLocalVariableTypes"]
  N207_A --> N207_B
  N208_A["buildReceiverTypeIndex"]
  N208_B["normalizeJavaType"]
  N208_A --> N208_B
  N209_A["extractResources"]
  N209_B["extractRepositoryOperationResources"]
  N209_A --> N209_B
  N210_A["extractResources"]
  N210_B["extractStringLiterals"]
  N210_A --> N210_B
  N211_A["extractRepositoryOperationResources"]
  N211_B["isPersistenceReceiver"]
  N211_A --> N211_B
  N212_A["extractRepositoryOperationResources"]
  N212_B["relatedResourcesForType"]
  N212_A --> N212_B
  N213_A["extractFrameworkHints"]
  N213_B["annotationAttribute"]
  N213_A --> N213_B
  N214_A["extractFrameworkHints"]
  N214_B["annotationByName"]
  N214_A --> N214_B
  N215_A["extractFrameworkHints"]
  N215_B["firstAnnotationString"]
  N215_A --> N215_B
  N216_A["extractFrameworkHints"]
  N216_B["hasAnnotation"]
  N216_A --> N216_B
  N217_A["extractFrameworkHints"]
  N217_B["routeFromAnnotations"]
  N217_A --> N217_B
  N218_A["extractEntrypointHints"]
  N218_B["hasAnnotation"]
  N218_A --> N218_B
  N219_A["routeFromAnnotations"]
  N219_B["annotationAttribute"]
  N219_A --> N219_B
  N220_A["routeFromAnnotations"]
  N220_B["annotationName"]
  N220_A --> N220_B
  N221_A["routeFromAnnotations"]
  N221_B["firstAnnotationString"]
  N221_A --> N221_B
  N222_A["routeFromAnnotations"]
  N222_B["joinRoutePaths"]
  N222_A --> N222_B
  N223_A["routeFromAnnotations"]
  N223_B["requestMappingMethod"]
  N223_A --> N223_B
  N224_A["requestMappingPath"]
  N224_B["annotationAttribute"]
  N224_A --> N224_B
  N225_A["requestMappingPath"]
  N225_B["annotationName"]
  N225_A --> N225_B
  N226_A["requestMappingPath"]
  N226_B["firstAnnotationString"]
  N226_A --> N226_B
  N227_A["parseParameters"]
  N227_B["splitTopLevel"]
  N227_A --> N227_B
  N228_A["parseParameters"]
  N228_B["stripAnnotations"]
  N228_A --> N228_B
  N229_A["extractFieldTypes"]
  N229_B["findMatchingBrace"]
  N229_A --> N229_B
  N230_A["extractFieldTypes"]
  N230_B["parseFieldStatement"]
  N230_A --> N230_B
  N231_A["extractLocalVariableTypes"]
  N231_B["normalizeJavaType"]
  N231_A --> N231_B
  N232_A["extractLocalVariableTypes"]
  N232_B["normalizeReceiverCall"]
  N232_A --> N232_B
  N233_A["parseFieldStatement"]
  N233_B["normalizeJavaType"]
  N233_A --> N233_B
  N234_A["parseFieldStatement"]
  N234_B["splitTopLevel"]
  N234_A --> N234_B
  N235_A["parseFieldStatement"]
  N235_B["stripAnnotations"]
  N235_A --> N235_B
  N236_A["hasAnnotation"]
  N236_B["annotationName"]
  N236_A --> N236_B
  N237_A["annotationByName"]
  N237_B["annotationName"]
  N237_A --> N237_B
  N238_A["locationFromOffsets"]
  N238_B["lineNumberAt"]
  N238_A --> N238_B
  N239_A["parseModules"]
  N239_B["findParserAdapter"]
  N239_A --> N239_B
  N240_A["parseModules"]
  N240_B["stableId"]
  N240_A --> N240_B
  N241_A["parseTypeScriptModule"]
  N241_B["extractFunctionUnit"]
  N241_A --> N241_B
  N242_A["parseTypeScriptModule"]
  N242_B["extractVariableFunctionUnit"]
  N242_A --> N242_B
  N243_A["parseTypeScriptModule"]
  N243_B["stableId"]
  N243_A --> N243_B
  N244_A["parseTypeScriptModule"]
  N244_B["summarizeModule"]
  N244_A --> N244_B
  N245_A["extractClassUnit"]
  N245_B["extractCallableUnit"]
  N245_A --> N245_B
  N246_A["extractClassUnit"]
  N246_B["getLocation"]
  N246_A --> N246_B
  N247_A["extractClassUnit"]
  N247_B["stableId"]
  N247_A --> N247_B
  N248_A["extractFunctionUnit"]
  N248_B["extractCallableUnit"]
  N248_A --> N248_B
  N249_A["extractVariableFunctionUnit"]
  N249_B["extractCallableUnit"]
  N249_A --> N249_B
  N250_A["extractCallableUnit"]
  N250_B["buildSignature"]
  N250_A --> N250_B
  N251_A["extractCallableUnit"]
  N251_B["extractParameters"]
  N251_A --> N251_B
  N252_A["extractCallableUnit"]
  N252_B["getLocation"]
  N252_A --> N252_B
  N253_A["extractCallableUnit"]
  N253_B["hasModifier"]
  N253_A --> N253_B
  N254_A["extractCallableUnit"]
  N254_B["isJavaScriptFile"]
  N254_A --> N254_B
  N255_A["extractCallableUnit"]
  N255_B["stableId"]
  N255_A --> N255_B
  N256_A["extractVisibility"]
  N256_B["hasModifier"]
  N256_A --> N256_B
  N257_A["extractCalls"]
  N257_B["formatCallExpression"]
  N257_A --> N257_B
  N258_A["extractFrameworkHints"]
  N258_B["literalText"]
  N258_A --> N258_B
  N259_A["extractFrameworkHints"]
  N259_B["parseHttpRouteCall"]
  N259_A --> N259_B
  N260_A["extractEntrypointHints"]
  N260_B["parseHttpRouteCall"]
  N260_A --> N260_B
  N261_A["parseHttpRouteCall"]
  N261_B["literalText"]
  N261_A --> N261_B
  N262_A["scanRepo"]
  N262_B["detectLanguage"]
  N262_A --> N262_B
  N263_A["scanRepo"]
  N263_B["matchesAnyExclude"]
  N263_A --> N263_B
  N264_A["scanRepo"]
  N264_B["toPosixPath"]
  N264_A --> N264_B
  N265_A["matchesAnyExclude"]
  N265_B["matchesExclude"]
  N265_A --> N265_B
  N266_A["matchesExclude"]
  N266_B["escapeRegex"]
  N266_A --> N266_B
  N267_A["matchesExclude"]
  N267_B["toPosixPath"]
  N267_A --> N267_B
  N268_A["readJson"]
  N268_B["readJsonAt"]
  N268_A --> N268_B
  N269_A["generateFixtureOutput"]
  N269_B["analyzeRepo"]
  N269_A --> N269_B
  N270_A["generateFixtureOutput"]
  N270_B["generateDocs"]
  N270_A --> N270_B
  N271_A["generateFixtureOutput"]
  N271_B["writeResultJson"]
  N271_A --> N271_B
  N272_A["assertSchema"]
  N272_B["assertSchema"]
  N272_A --> N272_B
  N273_A["assertSchema"]
  N273_B["typeOf"]
  N273_A --> N273_B
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
| generateDocs | renderEntrypoints | renderEntrypoints | 1 |
| generateDocs | renderExecutionFlows | renderExecutionFlows | 1 |
| generateDocs | renderMaintenanceGuide | renderMaintenanceGuide | 1 |
| generateDocs | renderModules | renderModules | 1 |
| generateDocs | renderProjectOverview | renderProjectOverview | 1 |
| generateDocs | renderQualityReport | renderQualityReport | 1 |
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
