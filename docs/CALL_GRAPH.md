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
  N37_B["table"]
  N37_A --> N37_B
  N38_A["renderCallGraph"]
  N38_B["escapeMermaid"]
  N38_A --> N38_B
  N39_A["renderCallGraph"]
  N39_B["heading"]
  N39_A --> N39_B
  N40_A["renderCallGraph"]
  N40_B["table"]
  N40_A --> N40_B
  N41_A["renderExecutionFlows"]
  N41_B["bulletList"]
  N41_A --> N41_B
  N42_A["renderExecutionFlows"]
  N42_B["formatMethodName"]
  N42_A --> N42_B
  N43_A["renderExecutionFlows"]
  N43_B["heading"]
  N43_A --> N43_B
  N44_A["renderBusinessFlows"]
  N44_B["bulletList"]
  N44_A --> N44_B
  N45_A["renderBusinessFlows"]
  N45_B["formatMethodName"]
  N45_A --> N45_B
  N46_A["renderBusinessFlows"]
  N46_B["heading"]
  N46_A --> N46_B
  N47_A["renderBusinessFlows"]
  N47_B["matchingNarrativeFlow"]
  N47_A --> N47_B
  N48_A["renderBusinessFlows"]
  N48_B["numberedList"]
  N48_A --> N48_B
  N49_A["renderBusinessFlows"]
  N49_B["table"]
  N49_A --> N49_B
  N50_A["renderEntrypoints"]
  N50_B["formatMethodName"]
  N50_A --> N50_B
  N51_A["renderEntrypoints"]
  N51_B["heading"]
  N51_A --> N51_B
  N52_A["renderEntrypoints"]
  N52_B["table"]
  N52_A --> N52_B
  N53_A["renderDataAndResources"]
  N53_B["heading"]
  N53_A --> N53_B
  N54_A["renderDataAndResources"]
  N54_B["isInternalResource"]
  N54_A --> N54_B
  N55_A["renderDataAndResources"]
  N55_B["table"]
  N55_A --> N55_B
  N56_A["renderMaintenanceGuide"]
  N56_B["bulletList"]
  N56_A --> N56_B
  N57_A["renderMaintenanceGuide"]
  N57_B["heading"]
  N57_A --> N57_B
  N58_A["renderMaintenanceGuide"]
  N58_B["table"]
  N58_A --> N58_B
  N59_A["composeProjectNarrative"]
  N59_B["NarrativeCache#open"]
  N59_A --> N59_B
  N60_A["composeProjectNarrative"]
  N60_B["buildNarrativeContext"]
  N60_A --> N60_B
  N61_A["composeProjectNarrative"]
  N61_B["buildNarrativePrompt"]
  N61_A --> N61_B
  N62_A["composeProjectNarrative"]
  N62_B["createChatModel"]
  N62_A --> N62_B
  N63_A["composeProjectNarrative"]
  N63_B["fallbackNarrative"]
  N63_A --> N63_B
  N64_A["composeProjectNarrative"]
  N64_B["parseNarrativeResponse"]
  N64_A --> N64_B
  N65_A["renderQualityReport"]
  N65_B["buildQualitySummary"]
  N65_A --> N65_B
  N66_A["renderQualityReport"]
  N66_B["bulletList"]
  N66_A --> N66_B
  N67_A["renderQualityReport"]
  N67_B["heading"]
  N67_A --> N67_B
  N68_A["renderQualityReport"]
  N68_B["table"]
  N68_A --> N68_B
  N69_A["buildQualitySummary"]
  N69_B["buildChecks"]
  N69_A --> N69_B
  N70_A["buildQualitySummary"]
  N70_B["calculateScore"]
  N70_A --> N70_B
  N71_A["buildQualitySummary"]
  N71_B["recommendations"]
  N71_A --> N71_B
  N72_A["buildChecks"]
  N72_B["countMatches"]
  N72_A --> N72_B
  N73_A["buildChecks"]
  N73_B["hasRequiredDocs"]
  N73_A --> N73_B
  N74_A["buildChecks"]
  N74_B["isChineseNarrative"]
  N74_A --> N74_B
  N75_A["buildChecks"]
  N75_B["maxDocLength"]
  N75_A --> N75_B
  N76_A["buildSemanticOverview"]
  N76_B["buildBusinessFlows"]
  N76_A --> N76_B
  N77_A["buildSemanticOverview"]
  N77_B["buildFlows"]
  N77_A --> N77_B
  N78_A["buildSemanticOverview"]
  N78_B["buildResourceUsage"]
  N78_A --> N78_B
  N79_A["buildSemanticOverview"]
  N79_B["countEdges"]
  N79_A --> N79_B
  N80_A["buildSemanticOverview"]
  N80_B["groupModules"]
  N80_A --> N80_B
  N81_A["buildSemanticOverview"]
  N81_B["inferPurpose"]
  N81_A --> N81_B
  N82_A["buildBusinessFlows"]
  N82_B["formatMethodName"]
  N82_A --> N82_B
  N83_A["buildBusinessFlows"]
  N83_B["walkFlow"]
  N83_A --> N83_B
  N84_A["groupModules"]
  N84_B["inferGroupName"]
  N84_A --> N84_B
  N85_A["groupModules"]
  N85_B["summarizeGroup"]
  N85_A --> N85_B
  N86_A["groupModules"]
  N86_B["summarizeResponsibilities"]
  N86_A --> N86_B
  N87_A["inferGroupName"]
  N87_B["inferJavaGroupName"]
  N87_A --> N87_B
  N88_A["buildFlows"]
  N88_B["formatMethodName"]
  N88_A --> N88_B
  N89_A["buildFlows"]
  N89_B["walkFlow"]
  N89_A --> N89_B
  N90_A["buildResourceUsage"]
  N90_B["isInternalResource"]
  N90_A --> N90_B
  N91_A["buildRelationGraph"]
  N91_B["buildMethodNameIndex"]
  N91_A --> N91_B
  N92_A["buildRelationGraph"]
  N92_B["dedupeEdges"]
  N92_A --> N92_B
  N93_A["buildRelationGraph"]
  N93_B["relationKindForResource"]
  N93_A --> N93_B
  N94_A["buildRelationGraph"]
  N94_B["resolveCallTarget"]
  N94_A --> N94_B
  N95_A["buildRelationGraph"]
  N95_B["scoreCall"]
  N95_A --> N95_B
  N96_A["buildRelationGraph"]
  N96_B["stableId"]
  N96_A --> N96_B
  N97_A["extractResources"]
  N97_B["resourceKind"]
  N97_A --> N97_B
  N98_A["extractResources"]
  N98_B["stableId"]
  N98_A --> N98_B
  N99_A["main"]
  N99_B["analyzeRepo"]
  N99_A --> N99_B
  N100_A["main"]
  N100_B["generateDocs"]
  N100_A --> N100_B
  N101_A["main"]
  N101_B["loadModelConfig"]
  N101_A --> N101_B
  N102_A["main"]
  N102_B["loadProjectConfig"]
  N102_A --> N102_B
  N103_A["main"]
  N103_B["parseArgs"]
  N103_A --> N103_B
  N104_A["main"]
  N104_B["printHelp"]
  N104_A --> N104_B
  N105_A["main"]
  N105_B["writeResultJson"]
  N105_A --> N105_B
  N106_A["parseArgs"]
  N106_B["requireValue"]
  N106_A --> N106_B
  N107_A["enrichModulesWithMethodSemantics"]
  N107_B["MethodSemanticCache#open"]
  N107_A --> N107_B
  N108_A["enrichModulesWithMethodSemantics"]
  N108_B["analyzeMethodWithLlm"]
  N108_A --> N108_B
  N109_A["enrichModulesWithMethodSemantics"]
  N109_B["createChatModel"]
  N109_A --> N109_B
  N110_A["enrichModulesWithMethodSemantics"]
  N110_B["formatError"]
  N110_A --> N110_B
  N111_A["enrichModulesWithMethodSemantics"]
  N111_B["heuristicSemantic"]
  N111_A --> N111_B
  N112_A["enrichModulesWithMethodSemantics"]
  N112_B["mapWithConcurrency"]
  N112_A --> N112_B
  N113_A["enrichModulesWithMethodSemantics"]
  N113_B["summarizeModuleFromMethods"]
  N113_A --> N113_B
  N114_A["attachHeuristicSemantics"]
  N114_B["heuristicSemantic"]
  N114_A --> N114_B
  N115_A["analyzeMethodWithLlm"]
  N115_B["buildPrompt"]
  N115_A --> N115_B
  N116_A["analyzeMethodWithLlm"]
  N116_B["parseModelResponse"]
  N116_A --> N116_B
  N117_A["parseModelResponse"]
  N117_B["normalizeSemantic"]
  N117_A --> N117_B
  N118_A["buildPrompt"]
  N118_B["trimSource"]
  N118_A --> N118_B
  N119_A["loadModelConfig"]
  N119_B["defaultBaseUrl"]
  N119_A --> N119_B
  N120_A["loadModelConfig"]
  N120_B["defaultModel"]
  N120_A --> N120_B
  N121_A["loadModelConfig"]
  N121_B["getApiKey"]
  N121_A --> N121_B
  N122_A["loadModelConfig"]
  N122_B["parseInteger"]
  N122_A --> N122_B
  N123_A["loadModelConfig"]
  N123_B["parseNumber"]
  N123_A --> N123_B
  N124_A["loadModelConfig"]
  N124_B["parseOptionalInteger"]
  N124_A --> N124_B
  N125_A["writeResultJson"]
  N125_B["buildResultDiff"]
  N125_A --> N125_B
  N126_A["writeResultJson"]
  N126_B["renderChangeSummary"]
  N126_A --> N126_B
  N127_A["writeResultJson"]
  N127_B["toResultJson"]
  N127_A --> N127_B
  N128_A["toResultJson"]
  N128_B["toPosixPath"]
  N128_A --> N128_B
  N129_A["serializeEntrypoint"]
  N129_B["methodRef"]
  N129_A --> N129_B
  N130_A["serializeFlow"]
  N130_B["methodRef"]
  N130_A --> N130_B
  N131_A["serializeBusinessFlow"]
  N131_B["methodRef"]
  N131_A --> N131_B
  N132_A["methodRef"]
  N132_B["formatMethodName"]
  N132_A --> N132_B
  N133_A["buildResultDiff"]
  N133_B["businessFlows"]
  N133_A --> N133_B
  N134_A["buildResultDiff"]
  N134_B["diffByKey"]
  N134_A --> N134_B
  N135_A["buildResultDiff"]
  N135_B["emptyBaselineDiff"]
  N135_A --> N135_B
  N136_A["buildResultDiff"]
  N136_B["entrypoints"]
  N136_A --> N136_B
  N137_A["buildResultDiff"]
  N137_B["files"]
  N137_A --> N137_B
  N138_A["buildResultDiff"]
  N138_B["methods"]
  N138_A --> N138_B
  N139_A["buildResultDiff"]
  N139_B["qualityScore"]
  N139_A --> N139_B
  N140_A["buildResultDiff"]
  N140_B["resources"]
  N140_A --> N140_B
  N141_A["buildResultDiff"]
  N141_B["stableStringify"]
  N141_A --> N141_B
  N142_A["buildResultDiff"]
  N142_B["stringField"]
  N142_A --> N142_B
  N143_A["emptyBaselineDiff"]
  N143_B["emptyChangeSet"]
  N143_A --> N143_B
  N144_A["emptyBaselineDiff"]
  N144_B["qualityScore"]
  N144_A --> N144_B
  N145_A["emptyBaselineDiff"]
  N145_B["stringField"]
  N145_A --> N145_B
  N146_A["files"]
  N146_B["arrayField"]
  N146_A --> N146_B
  N147_A["files"]
  N147_B["numberValue"]
  N147_A --> N147_B
  N148_A["files"]
  N148_B["stringValue"]
  N148_A --> N148_B
  N149_A["methods"]
  N149_B["arrayField"]
  N149_A --> N149_B
  N150_A["methods"]
  N150_B["stringValue"]
  N150_A --> N150_B
  N151_A["entrypoints"]
  N151_B["arrayField"]
  N151_A --> N151_B
  N152_A["entrypoints"]
  N152_B["methods"]
  N152_A --> N152_B
  N153_A["entrypoints"]
  N153_B["stringValue"]
  N153_A --> N153_B
  N154_A["resources"]
  N154_B["arrayField"]
  N154_A --> N154_B
  N155_A["businessFlows"]
  N155_B["arrayField"]
  N155_A --> N155_B
  N156_A["businessFlows"]
  N156_B["objectField"]
  N156_A --> N156_B
  N157_A["renderChangeSummary"]
  N157_B["renderEntrypointList"]
  N157_A --> N157_B
  N158_A["renderChangeSummary"]
  N158_B["renderMethodList"]
  N158_A --> N158_B
  N159_A["renderChangeSummary"]
  N159_B["renderStringChange"]
  N159_A --> N159_B
  N160_A["qualityScore"]
  N160_B["numberValue"]
  N160_A --> N160_B
  N161_A["qualityScore"]
  N161_B["objectField"]
  N161_A --> N161_B
  N162_A["stringField"]
  N162_B["stringValue"]
  N162_A --> N162_B
  N163_A["stableStringify"]
  N163_B["stableStringify"]
  N163_A --> N163_B
  N164_A["parseJavaModule"]
  N164_B["buildLineIndex"]
  N164_A --> N164_B
  N165_A["parseJavaModule"]
  N165_B["extractClassBlocks"]
  N165_A --> N165_B
  N166_A["parseJavaModule"]
  N166_B["maskJavaSource"]
  N166_A --> N166_B
  N167_A["parseJavaModule"]
  N167_B["stableId"]
  N167_A --> N167_B
  N168_A["extractClassBlocks"]
  N168_B["findMatchingBrace"]
  N168_A --> N168_B
  N169_A["extractClassUnit"]
  N169_B["buildMethodUnit"]
  N169_A --> N169_B
  N170_A["extractClassUnit"]
  N170_B["extractClassResources"]
  N170_A --> N170_B
  N171_A["extractClassUnit"]
  N171_B["extractMethodBlocks"]
  N171_A --> N171_B
  N172_A["extractClassUnit"]
  N172_B["locationFromOffsets"]
  N172_A --> N172_B
  N173_A["extractClassUnit"]
  N173_B["requestMappingPath"]
  N173_A --> N173_B
  N174_A["extractClassUnit"]
  N174_B["stableId"]
  N174_A --> N174_B
  N175_A["extractClassUnit"]
  N175_B["summarizeClass"]
  N175_A --> N175_B
  N176_A["extractClassResources"]
  N176_B["annotationAttribute"]
  N176_A --> N176_B
  N177_A["extractClassResources"]
  N177_B["annotationByName"]
  N177_A --> N177_B
  N178_A["extractClassResources"]
  N178_B["hasAnnotation"]
  N178_A --> N178_B
  N179_A["extractMethodBlocks"]
  N179_B["findMatchingBrace"]
  N179_A --> N179_B
  N180_A["extractMethodBlocks"]
  N180_B["leadingWhitespaceLength"]
  N180_A --> N180_B
  N181_A["extractMethodBlocks"]
  N181_B["parseMethodHeader"]
  N181_A --> N181_B
  N182_A["parseMethodHeader"]
  N182_B["parseParameters"]
  N182_A --> N182_B
  N183_A["parseMethodHeader"]
  N183_B["stripAnnotations"]
  N183_A --> N183_B
  N184_A["buildMethodUnit"]
  N184_B["locationFromOffsets"]
  N184_A --> N184_B
  N185_A["buildMethodUnit"]
  N185_B["stableId"]
  N185_A --> N185_B
  N186_A["extractResources"]
  N186_B["extractRepositoryOperationResources"]
  N186_A --> N186_B
  N187_A["extractResources"]
  N187_B["extractStringLiterals"]
  N187_A --> N187_B
  N188_A["extractRepositoryOperationResources"]
  N188_B["isPersistenceReceiver"]
  N188_A --> N188_B
  N189_A["extractRepositoryOperationResources"]
  N189_B["repositoryOperationIntent"]
  N189_A --> N189_B
  N190_A["extractFrameworkHints"]
  N190_B["annotationAttribute"]
  N190_A --> N190_B
  N191_A["extractFrameworkHints"]
  N191_B["annotationByName"]
  N191_A --> N191_B
  N192_A["extractFrameworkHints"]
  N192_B["firstAnnotationString"]
  N192_A --> N192_B
  N193_A["extractFrameworkHints"]
  N193_B["hasAnnotation"]
  N193_A --> N193_B
  N194_A["extractFrameworkHints"]
  N194_B["routeFromAnnotations"]
  N194_A --> N194_B
  N195_A["extractEntrypointHints"]
  N195_B["hasAnnotation"]
  N195_A --> N195_B
  N196_A["routeFromAnnotations"]
  N196_B["annotationAttribute"]
  N196_A --> N196_B
  N197_A["routeFromAnnotations"]
  N197_B["annotationName"]
  N197_A --> N197_B
  N198_A["routeFromAnnotations"]
  N198_B["firstAnnotationString"]
  N198_A --> N198_B
  N199_A["routeFromAnnotations"]
  N199_B["joinRoutePaths"]
  N199_A --> N199_B
  N200_A["routeFromAnnotations"]
  N200_B["requestMappingMethod"]
  N200_A --> N200_B
  N201_A["requestMappingPath"]
  N201_B["annotationAttribute"]
  N201_A --> N201_B
  N202_A["requestMappingPath"]
  N202_B["annotationName"]
  N202_A --> N202_B
  N203_A["requestMappingPath"]
  N203_B["firstAnnotationString"]
  N203_A --> N203_B
  N204_A["parseParameters"]
  N204_B["splitTopLevel"]
  N204_A --> N204_B
  N205_A["parseParameters"]
  N205_B["stripAnnotations"]
  N205_A --> N205_B
  N206_A["hasAnnotation"]
  N206_B["annotationName"]
  N206_A --> N206_B
  N207_A["annotationByName"]
  N207_B["annotationName"]
  N207_A --> N207_B
  N208_A["locationFromOffsets"]
  N208_B["lineNumberAt"]
  N208_A --> N208_B
  N209_A["parseModules"]
  N209_B["findParserAdapter"]
  N209_A --> N209_B
  N210_A["parseModules"]
  N210_B["stableId"]
  N210_A --> N210_B
  N211_A["parseTypeScriptModule"]
  N211_B["extractFunctionUnit"]
  N211_A --> N211_B
  N212_A["parseTypeScriptModule"]
  N212_B["extractVariableFunctionUnit"]
  N212_A --> N212_B
  N213_A["parseTypeScriptModule"]
  N213_B["stableId"]
  N213_A --> N213_B
  N214_A["parseTypeScriptModule"]
  N214_B["summarizeModule"]
  N214_A --> N214_B
  N215_A["extractClassUnit"]
  N215_B["extractCallableUnit"]
  N215_A --> N215_B
  N216_A["extractClassUnit"]
  N216_B["getLocation"]
  N216_A --> N216_B
  N217_A["extractClassUnit"]
  N217_B["stableId"]
  N217_A --> N217_B
  N218_A["extractFunctionUnit"]
  N218_B["extractCallableUnit"]
  N218_A --> N218_B
  N219_A["extractVariableFunctionUnit"]
  N219_B["extractCallableUnit"]
  N219_A --> N219_B
  N220_A["extractCallableUnit"]
  N220_B["buildSignature"]
  N220_A --> N220_B
  N221_A["extractCallableUnit"]
  N221_B["extractParameters"]
  N221_A --> N221_B
  N222_A["extractCallableUnit"]
  N222_B["getLocation"]
  N222_A --> N222_B
  N223_A["extractCallableUnit"]
  N223_B["hasModifier"]
  N223_A --> N223_B
  N224_A["extractCallableUnit"]
  N224_B["isJavaScriptFile"]
  N224_A --> N224_B
  N225_A["extractCallableUnit"]
  N225_B["stableId"]
  N225_A --> N225_B
  N226_A["extractVisibility"]
  N226_B["hasModifier"]
  N226_A --> N226_B
  N227_A["extractCalls"]
  N227_B["formatCallExpression"]
  N227_A --> N227_B
  N228_A["extractFrameworkHints"]
  N228_B["literalText"]
  N228_A --> N228_B
  N229_A["extractFrameworkHints"]
  N229_B["parseHttpRouteCall"]
  N229_A --> N229_B
  N230_A["extractEntrypointHints"]
  N230_B["parseHttpRouteCall"]
  N230_A --> N230_B
  N231_A["parseHttpRouteCall"]
  N231_B["literalText"]
  N231_A --> N231_B
  N232_A["scanRepo"]
  N232_B["detectLanguage"]
  N232_A --> N232_B
  N233_A["scanRepo"]
  N233_B["matchesAnyExclude"]
  N233_A --> N233_B
  N234_A["scanRepo"]
  N234_B["toPosixPath"]
  N234_A --> N234_B
  N235_A["matchesAnyExclude"]
  N235_B["matchesExclude"]
  N235_A --> N235_B
  N236_A["matchesExclude"]
  N236_B["escapeRegex"]
  N236_A --> N236_B
  N237_A["matchesExclude"]
  N237_B["toPosixPath"]
  N237_A --> N237_B
  N238_A["readJson"]
  N238_B["readJsonAt"]
  N238_A --> N238_B
  N239_A["generateFixtureOutput"]
  N239_B["analyzeRepo"]
  N239_A --> N239_B
  N240_A["generateFixtureOutput"]
  N240_B["generateDocs"]
  N240_A --> N240_B
  N241_A["generateFixtureOutput"]
  N241_B["writeResultJson"]
  N241_A --> N241_B
  N242_A["assertSchema"]
  N242_B["assertSchema"]
  N242_A --> N242_B
  N243_A["assertSchema"]
  N243_B["typeOf"]
  N243_A --> N243_B
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
| renderModules | table | table | 1 |
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
| parseJavaModule | buildLineIndex | buildLineIndex | 1 |
| parseJavaModule | extractClassBlocks | extractClassBlocks | 1 |
| parseJavaModule | maskJavaSource | maskJavaSource | 1 |
| parseJavaModule | stableId | stableId | 1 |
| extractClassBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractClassUnit | buildMethodUnit | buildMethodUnit | 1 |
| extractClassUnit | extractClassResources | extractClassResources | 1 |
| extractClassUnit | extractMethodBlocks | extractMethodBlocks | 1 |
| extractClassUnit | locationFromOffsets | locationFromOffsets | 1 |
| extractClassUnit | requestMappingPath | requestMappingPath | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractClassUnit | summarizeClass | summarizeClass | 1 |
| extractClassResources | annotationAttribute | annotationAttribute | 1 |
| extractClassResources | annotationByName | annotationByName | 1 |
| extractClassResources | hasAnnotation | hasAnnotation | 1 |
| extractMethodBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractMethodBlocks | leadingWhitespaceLength | leadingWhitespaceLength | 1 |
| extractMethodBlocks | parseMethodHeader | parseMethodHeader | 1 |
| parseMethodHeader | parseParameters | parseParameters | 1 |
| parseMethodHeader | stripAnnotations | stripAnnotations | 1 |
| buildMethodUnit | locationFromOffsets | locationFromOffsets | 1 |
| buildMethodUnit | stableId | stableId | 1 |
| extractResources | extractRepositoryOperationResources | extractRepositoryOperationResources | 1 |
| extractResources | extractStringLiterals | extractStringLiterals | 1 |
| extractRepositoryOperationResources | isPersistenceReceiver | isPersistenceReceiver | 1 |
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
