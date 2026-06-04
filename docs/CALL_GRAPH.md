# Call Graph

调用图只展示能够唯一匹配到仓库内部方法单元的调用表达式。

```mermaid
flowchart TD
  N0_A["scan"]
  N0_B["scan"]
  N0_A --> N0_B
  N1_A["analyzeRepo"]
  N1_B["attachHeuristicSemantics"]
  N1_A --> N1_B
  N2_A["analyzeRepo"]
  N2_B["buildRelationGraph"]
  N2_A --> N2_B
  N3_A["analyzeRepo"]
  N3_B["buildScanRuntimeInfo"]
  N3_A --> N3_B
  N4_A["analyzeRepo"]
  N4_B["enrichModulesWithMethodSemantics"]
  N4_A --> N4_B
  N5_A["analyzeRepo"]
  N5_B["loadModelConfig"]
  N5_A --> N5_B
  N6_A["analyzeRepo"]
  N6_B["parseModules"]
  N6_A --> N6_B
  N7_A["analyzeRepo"]
  N7_B["scanRepo"]
  N7_A --> N7_B
  N8_A["analyzeRepo"]
  N8_B["toModelRuntimeInfo"]
  N8_A --> N8_B
  N9_A["loadProjectConfig"]
  N9_B["rejectSensitiveKeys"]
  N9_A --> N9_B
  N10_A["rejectSensitiveKeys"]
  N10_B["rejectSensitiveKeys"]
  N10_A --> N10_B
  N11_A["generateDocs"]
  N11_B["buildQualitySummary"]
  N11_A --> N11_B
  N12_A["generateDocs"]
  N12_B["buildSemanticOverview"]
  N12_A --> N12_B
  N13_A["generateDocs"]
  N13_B["composeProjectNarrative"]
  N13_A --> N13_B
  N14_A["generateDocs"]
  N14_B["renderArchitecture"]
  N14_A --> N14_B
  N15_A["generateDocs"]
  N15_B["renderBusinessFlows"]
  N15_A --> N15_B
  N16_A["generateDocs"]
  N16_B["renderCallGraph"]
  N16_A --> N16_B
  N17_A["generateDocs"]
  N17_B["renderDataAndResources"]
  N17_A --> N17_B
  N18_A["generateDocs"]
  N18_B["renderEntrypoints"]
  N18_A --> N18_B
  N19_A["generateDocs"]
  N19_B["renderExecutionFlows"]
  N19_A --> N19_B
  N20_A["generateDocs"]
  N20_B["renderMaintenanceGuide"]
  N20_A --> N20_B
  N21_A["generateDocs"]
  N21_B["renderModules"]
  N21_A --> N21_B
  N22_A["generateDocs"]
  N22_B["renderProjectOverview"]
  N22_A --> N22_B
  N23_A["generateDocs"]
  N23_B["renderQualityReport"]
  N23_A --> N23_B
  N24_A["renderProjectOverview"]
  N24_B["bulletList"]
  N24_A --> N24_B
  N25_A["renderProjectOverview"]
  N25_B["heading"]
  N25_A --> N25_B
  N26_A["renderProjectOverview"]
  N26_B["isInternalResource"]
  N26_A --> N26_B
  N27_A["renderProjectOverview"]
  N27_B["numberedList"]
  N27_A --> N27_B
  N28_A["renderProjectOverview"]
  N28_B["table"]
  N28_A --> N28_B
  N29_A["renderArchitecture"]
  N29_B["bulletList"]
  N29_A --> N29_B
  N30_A["renderArchitecture"]
  N30_B["formatMethodName"]
  N30_A --> N30_B
  N31_A["renderArchitecture"]
  N31_B["heading"]
  N31_A --> N31_B
  N32_A["renderArchitecture"]
  N32_B["isInternalResource"]
  N32_A --> N32_B
  N33_A["renderArchitecture"]
  N33_B["table"]
  N33_A --> N33_B
  N34_A["renderModules"]
  N34_B["bulletList"]
  N34_A --> N34_B
  N35_A["renderModules"]
  N35_B["formatMethodHints"]
  N35_A --> N35_B
  N36_A["renderModules"]
  N36_B["heading"]
  N36_A --> N36_B
  N37_A["renderModules"]
  N37_B["selectHighSignalMethods"]
  N37_A --> N37_B
  N38_A["renderModules"]
  N38_B["table"]
  N38_A --> N38_B
  N39_A["selectHighSignalMethods"]
  N39_B["scoreMethodForModuleDocs"]
  N39_A --> N39_B
  N40_A["renderCallGraph"]
  N40_B["escapeMermaid"]
  N40_A --> N40_B
  N41_A["renderCallGraph"]
  N41_B["heading"]
  N41_A --> N41_B
  N42_A["renderCallGraph"]
  N42_B["table"]
  N42_A --> N42_B
  N43_A["renderExecutionFlows"]
  N43_B["bulletList"]
  N43_A --> N43_B
  N44_A["renderExecutionFlows"]
  N44_B["formatMethodName"]
  N44_A --> N44_B
  N45_A["renderExecutionFlows"]
  N45_B["heading"]
  N45_A --> N45_B
  N46_A["renderBusinessFlows"]
  N46_B["bulletList"]
  N46_A --> N46_B
  N47_A["renderBusinessFlows"]
  N47_B["formatMethodName"]
  N47_A --> N47_B
  N48_A["renderBusinessFlows"]
  N48_B["heading"]
  N48_A --> N48_B
  N49_A["renderBusinessFlows"]
  N49_B["matchingNarrativeFlow"]
  N49_A --> N49_B
  N50_A["renderBusinessFlows"]
  N50_B["numberedList"]
  N50_A --> N50_B
  N51_A["renderBusinessFlows"]
  N51_B["table"]
  N51_A --> N51_B
  N52_A["renderEntrypoints"]
  N52_B["formatMethodName"]
  N52_A --> N52_B
  N53_A["renderEntrypoints"]
  N53_B["heading"]
  N53_A --> N53_B
  N54_A["renderEntrypoints"]
  N54_B["table"]
  N54_A --> N54_B
  N55_A["renderDataAndResources"]
  N55_B["heading"]
  N55_A --> N55_B
  N56_A["renderDataAndResources"]
  N56_B["isInternalResource"]
  N56_A --> N56_B
  N57_A["renderDataAndResources"]
  N57_B["table"]
  N57_A --> N57_B
  N58_A["renderMaintenanceGuide"]
  N58_B["bulletList"]
  N58_A --> N58_B
  N59_A["renderMaintenanceGuide"]
  N59_B["heading"]
  N59_A --> N59_B
  N60_A["renderMaintenanceGuide"]
  N60_B["table"]
  N60_A --> N60_B
  N61_A["composeProjectNarrative"]
  N61_B["NarrativeCache#open"]
  N61_A --> N61_B
  N62_A["composeProjectNarrative"]
  N62_B["buildNarrativeContext"]
  N62_A --> N62_B
  N63_A["composeProjectNarrative"]
  N63_B["buildNarrativePrompt"]
  N63_A --> N63_B
  N64_A["composeProjectNarrative"]
  N64_B["createChatModel"]
  N64_A --> N64_B
  N65_A["composeProjectNarrative"]
  N65_B["fallbackNarrative"]
  N65_A --> N65_B
  N66_A["composeProjectNarrative"]
  N66_B["parseNarrativeResponse"]
  N66_A --> N66_B
  N67_A["fallbackNarrative"]
  N67_B["fallbackOperatingModel"]
  N67_A --> N67_B
  N68_A["renderQualityReport"]
  N68_B["buildQualitySummary"]
  N68_A --> N68_B
  N69_A["renderQualityReport"]
  N69_B["bulletList"]
  N69_A --> N69_B
  N70_A["renderQualityReport"]
  N70_B["heading"]
  N70_A --> N70_B
  N71_A["renderQualityReport"]
  N71_B["table"]
  N71_A --> N71_B
  N72_A["buildQualitySummary"]
  N72_B["buildChecks"]
  N72_A --> N72_B
  N73_A["buildQualitySummary"]
  N73_B["calculateScore"]
  N73_A --> N73_B
  N74_A["buildQualitySummary"]
  N74_B["recommendations"]
  N74_A --> N74_B
  N75_A["buildChecks"]
  N75_B["countMatches"]
  N75_A --> N75_B
  N76_A["buildChecks"]
  N76_B["hasRequiredDocs"]
  N76_A --> N76_B
  N77_A["buildChecks"]
  N77_B["isChineseNarrative"]
  N77_A --> N77_B
  N78_A["buildChecks"]
  N78_B["maxDocLength"]
  N78_A --> N78_B
  N79_A["buildSemanticOverview"]
  N79_B["buildBusinessFlows"]
  N79_A --> N79_B
  N80_A["buildSemanticOverview"]
  N80_B["buildFlows"]
  N80_A --> N80_B
  N81_A["buildSemanticOverview"]
  N81_B["buildResourceUsage"]
  N81_A --> N81_B
  N82_A["buildSemanticOverview"]
  N82_B["countEdges"]
  N82_A --> N82_B
  N83_A["buildSemanticOverview"]
  N83_B["groupModules"]
  N83_A --> N83_B
  N84_A["buildSemanticOverview"]
  N84_B["inferPurpose"]
  N84_A --> N84_B
  N85_A["buildBusinessFlows"]
  N85_B["formatMethodName"]
  N85_A --> N85_B
  N86_A["buildBusinessFlows"]
  N86_B["walkFlow"]
  N86_A --> N86_B
  N87_A["groupModules"]
  N87_B["inferGroupName"]
  N87_A --> N87_B
  N88_A["groupModules"]
  N88_B["summarizeGroup"]
  N88_A --> N88_B
  N89_A["groupModules"]
  N89_B["summarizeResponsibilities"]
  N89_A --> N89_B
  N90_A["inferGroupName"]
  N90_B["inferJavaGroupName"]
  N90_A --> N90_B
  N91_A["inferPurpose"]
  N91_B["collectResourceNames"]
  N91_A --> N91_B
  N92_A["inferPurpose"]
  N92_B["formatChineseList"]
  N92_A --> N92_B
  N93_A["buildFlows"]
  N93_B["formatMethodName"]
  N93_A --> N93_B
  N94_A["buildFlows"]
  N94_B["walkFlow"]
  N94_A --> N94_B
  N95_A["buildResourceUsage"]
  N95_B["isInternalResource"]
  N95_A --> N95_B
  N96_A["buildRelationGraph"]
  N96_B["buildMethodNameIndex"]
  N96_A --> N96_B
  N97_A["buildRelationGraph"]
  N97_B["dedupeEdges"]
  N97_A --> N97_B
  N98_A["buildRelationGraph"]
  N98_B["relationKindForResource"]
  N98_A --> N98_B
  N99_A["buildRelationGraph"]
  N99_B["resolveCallTarget"]
  N99_A --> N99_B
  N100_A["buildRelationGraph"]
  N100_B["scoreCall"]
  N100_A --> N100_B
  N101_A["buildRelationGraph"]
  N101_B["stableId"]
  N101_A --> N101_B
  N102_A["extractResources"]
  N102_B["resourceKind"]
  N102_A --> N102_B
  N103_A["extractResources"]
  N103_B["stableId"]
  N103_A --> N103_B
  N104_A["main"]
  N104_B["analyzeRepo"]
  N104_A --> N104_B
  N105_A["main"]
  N105_B["generateDocs"]
  N105_A --> N105_B
  N106_A["main"]
  N106_B["loadModelConfig"]
  N106_A --> N106_B
  N107_A["main"]
  N107_B["loadProjectConfig"]
  N107_A --> N107_B
  N108_A["main"]
  N108_B["parseArgs"]
  N108_A --> N108_B
  N109_A["main"]
  N109_B["printHelp"]
  N109_A --> N109_B
  N110_A["main"]
  N110_B["writeResultJson"]
  N110_A --> N110_B
  N111_A["parseArgs"]
  N111_B["requireValue"]
  N111_A --> N111_B
  N112_A["enrichModulesWithMethodSemantics"]
  N112_B["MethodSemanticCache#open"]
  N112_A --> N112_B
  N113_A["enrichModulesWithMethodSemantics"]
  N113_B["analyzeMethodWithLlm"]
  N113_A --> N113_B
  N114_A["enrichModulesWithMethodSemantics"]
  N114_B["createChatModel"]
  N114_A --> N114_B
  N115_A["enrichModulesWithMethodSemantics"]
  N115_B["formatError"]
  N115_A --> N115_B
  N116_A["enrichModulesWithMethodSemantics"]
  N116_B["heuristicSemantic"]
  N116_A --> N116_B
  N117_A["enrichModulesWithMethodSemantics"]
  N117_B["mapWithConcurrency"]
  N117_A --> N117_B
  N118_A["enrichModulesWithMethodSemantics"]
  N118_B["summarizeModuleFromMethods"]
  N118_A --> N118_B
  N119_A["attachHeuristicSemantics"]
  N119_B["heuristicSemantic"]
  N119_A --> N119_B
  N120_A["analyzeMethodWithLlm"]
  N120_B["buildPrompt"]
  N120_A --> N120_B
  N121_A["analyzeMethodWithLlm"]
  N121_B["parseModelResponse"]
  N121_A --> N121_B
  N122_A["parseModelResponse"]
  N122_B["normalizeSemantic"]
  N122_A --> N122_B
  N123_A["buildPrompt"]
  N123_B["trimSource"]
  N123_A --> N123_B
  N124_A["loadModelConfig"]
  N124_B["defaultBaseUrl"]
  N124_A --> N124_B
  N125_A["loadModelConfig"]
  N125_B["defaultModel"]
  N125_A --> N125_B
  N126_A["loadModelConfig"]
  N126_B["getApiKey"]
  N126_A --> N126_B
  N127_A["loadModelConfig"]
  N127_B["parseInteger"]
  N127_A --> N127_B
  N128_A["loadModelConfig"]
  N128_B["parseNumber"]
  N128_A --> N128_B
  N129_A["loadModelConfig"]
  N129_B["parseOptionalInteger"]
  N129_A --> N129_B
  N130_A["writeResultJson"]
  N130_B["buildResultDiff"]
  N130_A --> N130_B
  N131_A["writeResultJson"]
  N131_B["renderChangeSummary"]
  N131_A --> N131_B
  N132_A["writeResultJson"]
  N132_B["toResultJson"]
  N132_A --> N132_B
  N133_A["toResultJson"]
  N133_B["toPosixPath"]
  N133_A --> N133_B
  N134_A["serializeEntrypoint"]
  N134_B["methodRef"]
  N134_A --> N134_B
  N135_A["serializeFlow"]
  N135_B["methodRef"]
  N135_A --> N135_B
  N136_A["serializeBusinessFlow"]
  N136_B["methodRef"]
  N136_A --> N136_B
  N137_A["methodRef"]
  N137_B["formatMethodName"]
  N137_A --> N137_B
  N138_A["buildResultDiff"]
  N138_B["businessFlows"]
  N138_A --> N138_B
  N139_A["buildResultDiff"]
  N139_B["diffByKey"]
  N139_A --> N139_B
  N140_A["buildResultDiff"]
  N140_B["emptyBaselineDiff"]
  N140_A --> N140_B
  N141_A["buildResultDiff"]
  N141_B["entrypoints"]
  N141_A --> N141_B
  N142_A["buildResultDiff"]
  N142_B["files"]
  N142_A --> N142_B
  N143_A["buildResultDiff"]
  N143_B["methods"]
  N143_A --> N143_B
  N144_A["buildResultDiff"]
  N144_B["qualityScore"]
  N144_A --> N144_B
  N145_A["buildResultDiff"]
  N145_B["resources"]
  N145_A --> N145_B
  N146_A["buildResultDiff"]
  N146_B["stableStringify"]
  N146_A --> N146_B
  N147_A["buildResultDiff"]
  N147_B["stringField"]
  N147_A --> N147_B
  N148_A["emptyBaselineDiff"]
  N148_B["emptyChangeSet"]
  N148_A --> N148_B
  N149_A["emptyBaselineDiff"]
  N149_B["qualityScore"]
  N149_A --> N149_B
  N150_A["emptyBaselineDiff"]
  N150_B["stringField"]
  N150_A --> N150_B
  N151_A["files"]
  N151_B["arrayField"]
  N151_A --> N151_B
  N152_A["files"]
  N152_B["numberValue"]
  N152_A --> N152_B
  N153_A["files"]
  N153_B["stringValue"]
  N153_A --> N153_B
  N154_A["methods"]
  N154_B["arrayField"]
  N154_A --> N154_B
  N155_A["methods"]
  N155_B["stringValue"]
  N155_A --> N155_B
  N156_A["entrypoints"]
  N156_B["arrayField"]
  N156_A --> N156_B
  N157_A["entrypoints"]
  N157_B["methods"]
  N157_A --> N157_B
  N158_A["entrypoints"]
  N158_B["stringValue"]
  N158_A --> N158_B
  N159_A["resources"]
  N159_B["arrayField"]
  N159_A --> N159_B
  N160_A["businessFlows"]
  N160_B["arrayField"]
  N160_A --> N160_B
  N161_A["businessFlows"]
  N161_B["objectField"]
  N161_A --> N161_B
  N162_A["renderChangeSummary"]
  N162_B["renderEntrypointList"]
  N162_A --> N162_B
  N163_A["renderChangeSummary"]
  N163_B["renderMethodList"]
  N163_A --> N163_B
  N164_A["renderChangeSummary"]
  N164_B["renderStringChange"]
  N164_A --> N164_B
  N165_A["qualityScore"]
  N165_B["numberValue"]
  N165_A --> N165_B
  N166_A["qualityScore"]
  N166_B["objectField"]
  N166_A --> N166_B
  N167_A["stringField"]
  N167_B["stringValue"]
  N167_A --> N167_B
  N168_A["stableStringify"]
  N168_B["stableStringify"]
  N168_A --> N168_B
  N169_A["parseJavaModule"]
  N169_B["buildClassResourceIndex"]
  N169_A --> N169_B
  N170_A["parseJavaModule"]
  N170_B["buildLineIndex"]
  N170_A --> N170_B
  N171_A["parseJavaModule"]
  N171_B["extractClassBlocks"]
  N171_A --> N171_B
  N172_A["parseJavaModule"]
  N172_B["maskJavaSource"]
  N172_A --> N172_B
  N173_A["parseJavaModule"]
  N173_B["stableId"]
  N173_A --> N173_B
  N174_A["extractClassBlocks"]
  N174_B["findMatchingBrace"]
  N174_A --> N174_B
  N175_A["extractClassUnit"]
  N175_B["buildMethodUnit"]
  N175_A --> N175_B
  N176_A["extractClassUnit"]
  N176_B["extractClassResources"]
  N176_A --> N176_B
  N177_A["extractClassUnit"]
  N177_B["extractFieldTypes"]
  N177_A --> N177_B
  N178_A["extractClassUnit"]
  N178_B["extractMethodBlocks"]
  N178_A --> N178_B
  N179_A["extractClassUnit"]
  N179_B["locationFromOffsets"]
  N179_A --> N179_B
  N180_A["extractClassUnit"]
  N180_B["requestMappingPath"]
  N180_A --> N180_B
  N181_A["extractClassUnit"]
  N181_B["stableId"]
  N181_A --> N181_B
  N182_A["extractClassUnit"]
  N182_B["summarizeClass"]
  N182_A --> N182_B
  N183_A["extractClassResources"]
  N183_B["annotationAttribute"]
  N183_A --> N183_B
  N184_A["extractClassResources"]
  N184_B["annotationByName"]
  N184_A --> N184_B
  N185_A["extractClassResources"]
  N185_B["hasAnnotation"]
  N185_A --> N185_B
  N186_A["buildClassResourceIndex"]
  N186_B["extractClassResources"]
  N186_A --> N186_B
  N187_A["extractMethodBlocks"]
  N187_B["findMatchingBrace"]
  N187_A --> N187_B
  N188_A["extractMethodBlocks"]
  N188_B["leadingWhitespaceLength"]
  N188_A --> N188_B
  N189_A["extractMethodBlocks"]
  N189_B["parseMethodHeader"]
  N189_A --> N189_B
  N190_A["parseMethodHeader"]
  N190_B["parseParameters"]
  N190_A --> N190_B
  N191_A["parseMethodHeader"]
  N191_B["stripAnnotations"]
  N191_A --> N191_B
  N192_A["buildMethodUnit"]
  N192_B["locationFromOffsets"]
  N192_A --> N192_B
  N193_A["buildMethodUnit"]
  N193_B["stableId"]
  N193_A --> N193_B
  N194_A["extractCalls"]
  N194_B["normalizeReceiverCall"]
  N194_A --> N194_B
  N195_A["extractResources"]
  N195_B["extractRepositoryOperationResources"]
  N195_A --> N195_B
  N196_A["extractResources"]
  N196_B["extractStringLiterals"]
  N196_A --> N196_B
  N197_A["extractRepositoryOperationResources"]
  N197_B["isPersistenceReceiver"]
  N197_A --> N197_B
  N198_A["extractRepositoryOperationResources"]
  N198_B["relatedResourcesForType"]
  N198_A --> N198_B
  N199_A["extractRepositoryOperationResources"]
  N199_B["repositoryOperationIntent"]
  N199_A --> N199_B
  N200_A["extractFrameworkHints"]
  N200_B["annotationAttribute"]
  N200_A --> N200_B
  N201_A["extractFrameworkHints"]
  N201_B["annotationByName"]
  N201_A --> N201_B
  N202_A["extractFrameworkHints"]
  N202_B["firstAnnotationString"]
  N202_A --> N202_B
  N203_A["extractFrameworkHints"]
  N203_B["hasAnnotation"]
  N203_A --> N203_B
  N204_A["extractFrameworkHints"]
  N204_B["routeFromAnnotations"]
  N204_A --> N204_B
  N205_A["extractEntrypointHints"]
  N205_B["hasAnnotation"]
  N205_A --> N205_B
  N206_A["routeFromAnnotations"]
  N206_B["annotationAttribute"]
  N206_A --> N206_B
  N207_A["routeFromAnnotations"]
  N207_B["annotationName"]
  N207_A --> N207_B
  N208_A["routeFromAnnotations"]
  N208_B["firstAnnotationString"]
  N208_A --> N208_B
  N209_A["routeFromAnnotations"]
  N209_B["joinRoutePaths"]
  N209_A --> N209_B
  N210_A["routeFromAnnotations"]
  N210_B["requestMappingMethod"]
  N210_A --> N210_B
  N211_A["requestMappingPath"]
  N211_B["annotationAttribute"]
  N211_A --> N211_B
  N212_A["requestMappingPath"]
  N212_B["annotationName"]
  N212_A --> N212_B
  N213_A["requestMappingPath"]
  N213_B["firstAnnotationString"]
  N213_A --> N213_B
  N214_A["parseParameters"]
  N214_B["splitTopLevel"]
  N214_A --> N214_B
  N215_A["parseParameters"]
  N215_B["stripAnnotations"]
  N215_A --> N215_B
  N216_A["extractFieldTypes"]
  N216_B["findMatchingBrace"]
  N216_A --> N216_B
  N217_A["extractFieldTypes"]
  N217_B["parseFieldStatement"]
  N217_A --> N217_B
  N218_A["parseFieldStatement"]
  N218_B["normalizeJavaType"]
  N218_A --> N218_B
  N219_A["parseFieldStatement"]
  N219_B["splitTopLevel"]
  N219_A --> N219_B
  N220_A["parseFieldStatement"]
  N220_B["stripAnnotations"]
  N220_A --> N220_B
  N221_A["hasAnnotation"]
  N221_B["annotationName"]
  N221_A --> N221_B
  N222_A["annotationByName"]
  N222_B["annotationName"]
  N222_A --> N222_B
  N223_A["locationFromOffsets"]
  N223_B["lineNumberAt"]
  N223_A --> N223_B
  N224_A["parseModules"]
  N224_B["findParserAdapter"]
  N224_A --> N224_B
  N225_A["parseModules"]
  N225_B["stableId"]
  N225_A --> N225_B
  N226_A["parseTypeScriptModule"]
  N226_B["extractFunctionUnit"]
  N226_A --> N226_B
  N227_A["parseTypeScriptModule"]
  N227_B["extractVariableFunctionUnit"]
  N227_A --> N227_B
  N228_A["parseTypeScriptModule"]
  N228_B["stableId"]
  N228_A --> N228_B
  N229_A["parseTypeScriptModule"]
  N229_B["summarizeModule"]
  N229_A --> N229_B
  N230_A["extractClassUnit"]
  N230_B["extractCallableUnit"]
  N230_A --> N230_B
  N231_A["extractClassUnit"]
  N231_B["getLocation"]
  N231_A --> N231_B
  N232_A["extractClassUnit"]
  N232_B["stableId"]
  N232_A --> N232_B
  N233_A["extractFunctionUnit"]
  N233_B["extractCallableUnit"]
  N233_A --> N233_B
  N234_A["extractVariableFunctionUnit"]
  N234_B["extractCallableUnit"]
  N234_A --> N234_B
  N235_A["extractCallableUnit"]
  N235_B["buildSignature"]
  N235_A --> N235_B
  N236_A["extractCallableUnit"]
  N236_B["extractParameters"]
  N236_A --> N236_B
  N237_A["extractCallableUnit"]
  N237_B["getLocation"]
  N237_A --> N237_B
  N238_A["extractCallableUnit"]
  N238_B["hasModifier"]
  N238_A --> N238_B
  N239_A["extractCallableUnit"]
  N239_B["isJavaScriptFile"]
  N239_A --> N239_B
  N240_A["extractCallableUnit"]
  N240_B["stableId"]
  N240_A --> N240_B
  N241_A["extractVisibility"]
  N241_B["hasModifier"]
  N241_A --> N241_B
  N242_A["extractCalls"]
  N242_B["formatCallExpression"]
  N242_A --> N242_B
  N243_A["extractFrameworkHints"]
  N243_B["literalText"]
  N243_A --> N243_B
  N244_A["extractFrameworkHints"]
  N244_B["parseHttpRouteCall"]
  N244_A --> N244_B
  N245_A["extractEntrypointHints"]
  N245_B["parseHttpRouteCall"]
  N245_A --> N245_B
  N246_A["parseHttpRouteCall"]
  N246_B["literalText"]
  N246_A --> N246_B
  N247_A["scanRepo"]
  N247_B["detectLanguage"]
  N247_A --> N247_B
  N248_A["scanRepo"]
  N248_B["matchesAnyExclude"]
  N248_A --> N248_B
  N249_A["scanRepo"]
  N249_B["toPosixPath"]
  N249_A --> N249_B
  N250_A["matchesAnyExclude"]
  N250_B["matchesExclude"]
  N250_A --> N250_B
  N251_A["matchesExclude"]
  N251_B["escapeRegex"]
  N251_A --> N251_B
  N252_A["matchesExclude"]
  N252_B["toPosixPath"]
  N252_A --> N252_B
  N253_A["readJson"]
  N253_B["readJsonAt"]
  N253_A --> N253_B
  N254_A["generateFixtureOutput"]
  N254_B["analyzeRepo"]
  N254_A --> N254_B
  N255_A["generateFixtureOutput"]
  N255_B["generateDocs"]
  N255_A --> N255_B
  N256_A["generateFixtureOutput"]
  N256_B["writeResultJson"]
  N256_A --> N256_B
  N257_A["assertSchema"]
  N257_B["assertSchema"]
  N257_A --> N257_B
  N258_A["assertSchema"]
  N258_B["typeOf"]
  N258_A --> N258_B
```

## Edges

| From | To | Call | Weight |
| --- | --- | --- | --- |
| scan | scan | scan | 1 |
| analyzeRepo | attachHeuristicSemantics | attachHeuristicSemantics | 1 |
| analyzeRepo | buildRelationGraph | buildRelationGraph | 1 |
| analyzeRepo | buildScanRuntimeInfo | buildScanRuntimeInfo | 1 |
| analyzeRepo | enrichModulesWithMethodSemantics | enrichModulesWithMethodSemantics | 1 |
| analyzeRepo | loadModelConfig | loadModelConfig | 1 |
| analyzeRepo | parseModules | parseModules | 1 |
| analyzeRepo | scanRepo | scanRepo | 1 |
| analyzeRepo | toModelRuntimeInfo | toModelRuntimeInfo | 1 |
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
| extractMethodBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractMethodBlocks | leadingWhitespaceLength | leadingWhitespaceLength | 1 |
| extractMethodBlocks | parseMethodHeader | parseMethodHeader | 1 |
| parseMethodHeader | parseParameters | parseParameters | 1 |
| parseMethodHeader | stripAnnotations | stripAnnotations | 1 |
| buildMethodUnit | locationFromOffsets | locationFromOffsets | 1 |
| buildMethodUnit | stableId | stableId | 1 |
| extractCalls | normalizeReceiverCall | normalizeReceiverCall | 1 |
| extractResources | extractRepositoryOperationResources | extractRepositoryOperationResources | 1 |
| extractResources | extractStringLiterals | extractStringLiterals | 1 |
| extractRepositoryOperationResources | isPersistenceReceiver | isPersistenceReceiver | 1 |
| extractRepositoryOperationResources | relatedResourcesForType | relatedResourcesForType | 1 |
| extractRepositoryOperationResources | repositoryOperationIntent | repositoryOperationIntent | 1 |
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
