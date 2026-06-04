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
  N18_A["runAnalyzeCommand"]
  N18_B["analyzeRepo"]
  N18_A --> N18_B
  N19_A["runAnalyzeCommand"]
  N19_B["generateDocs"]
  N19_A --> N19_B
  N20_A["runAnalyzeCommand"]
  N20_B["loadModelConfig"]
  N20_A --> N20_B
  N21_A["runAnalyzeCommand"]
  N21_B["loadProjectConfig"]
  N21_A --> N21_B
  N22_A["runAnalyzeCommand"]
  N22_B["writeResultJson"]
  N22_A --> N22_B
  N23_A["parseCliArgs"]
  N23_B["commandFrom"]
  N23_A --> N23_B
  N24_A["parseCliArgs"]
  N24_B["parsePositiveInteger"]
  N24_A --> N24_B
  N25_A["parseCliArgs"]
  N25_B["requireValue"]
  N25_A --> N25_B
  N26_A["runDoctorCommand"]
  N26_B["collectDoctorChecks"]
  N26_A --> N26_B
  N27_A["runDoctorCommand"]
  N27_B["formatStatus"]
  N27_A --> N27_B
  N28_A["collectDoctorChecks"]
  N28_B["isDirectory"]
  N28_A --> N28_B
  N29_A["collectDoctorChecks"]
  N29_B["loadModelConfig"]
  N29_A --> N29_B
  N30_A["collectDoctorChecks"]
  N30_B["loadProjectConfig"]
  N30_A --> N30_B
  N31_A["isDirectory"]
  N31_B["isDirectory"]
  N31_A --> N31_B
  N32_A["runInitCommand"]
  N32_B["writeProjectConfig"]
  N32_A --> N32_B
  N33_A["writeProjectConfig"]
  N33_B["buildProjectConfig"]
  N33_A --> N33_B
  N34_A["writeProjectConfig"]
  N34_B["exists"]
  N34_A --> N34_B
  N35_A["runInteractiveCommand"]
  N35_B["ask"]
  N35_A --> N35_B
  N36_A["runInteractiveCommand"]
  N36_B["askSecret"]
  N36_A --> N36_B
  N37_A["runInteractiveCommand"]
  N37_B["askYesNo"]
  N37_A --> N37_B
  N38_A["runInteractiveCommand"]
  N38_B["loadModelConfig"]
  N38_A --> N38_B
  N39_A["runInteractiveCommand"]
  N39_B["loadProjectConfig"]
  N39_A --> N39_B
  N40_A["runInteractiveCommand"]
  N40_B["normalizeProvider"]
  N40_A --> N40_B
  N41_A["runInteractiveCommand"]
  N41_B["runAnalyzeCommand"]
  N41_A --> N41_B
  N42_A["runInteractiveCommand"]
  N42_B["runDoctorCommand"]
  N42_A --> N42_B
  N43_A["runInteractiveCommand"]
  N43_B["runInitCommand"]
  N43_A --> N43_B
  N44_A["askSecret"]
  N44_B["ask"]
  N44_A --> N44_B
  N45_A["loadProjectConfig"]
  N45_B["rejectSensitiveKeys"]
  N45_A --> N45_B
  N46_A["rejectSensitiveKeys"]
  N46_B["rejectSensitiveKeys"]
  N46_A --> N46_B
  N47_A["generateDocs"]
  N47_B["buildQualitySummary"]
  N47_A --> N47_B
  N48_A["generateDocs"]
  N48_B["buildSemanticOverview"]
  N48_A --> N48_B
  N49_A["generateDocs"]
  N49_B["composeProjectNarrative"]
  N49_A --> N49_B
  N50_A["generateDocs"]
  N50_B["renderArchitecture"]
  N50_A --> N50_B
  N51_A["generateDocs"]
  N51_B["renderBusinessFlows"]
  N51_A --> N51_B
  N52_A["generateDocs"]
  N52_B["renderCallGraph"]
  N52_A --> N52_B
  N53_A["generateDocs"]
  N53_B["renderDataAndResources"]
  N53_A --> N53_B
  N54_A["generateDocs"]
  N54_B["renderDocIndex"]
  N54_A --> N54_B
  N55_A["generateDocs"]
  N55_B["renderEntrypoints"]
  N55_A --> N55_B
  N56_A["generateDocs"]
  N56_B["renderExecutionFlows"]
  N56_A --> N56_B
  N57_A["generateDocs"]
  N57_B["renderMaintenanceGuide"]
  N57_A --> N57_B
  N58_A["generateDocs"]
  N58_B["renderModules"]
  N58_A --> N58_B
  N59_A["generateDocs"]
  N59_B["renderProjectOverview"]
  N59_A --> N59_B
  N60_A["generateDocs"]
  N60_B["renderQualityReport"]
  N60_A --> N60_B
  N61_A["renderDocIndex"]
  N61_B["bulletList"]
  N61_A --> N61_B
  N62_A["renderDocIndex"]
  N62_B["heading"]
  N62_A --> N62_B
  N63_A["renderDocIndex"]
  N63_B["isInternalResource"]
  N63_A --> N63_B
  N64_A["renderDocIndex"]
  N64_B["numberedList"]
  N64_A --> N64_B
  N65_A["renderDocIndex"]
  N65_B["table"]
  N65_A --> N65_B
  N66_A["renderProjectOverview"]
  N66_B["bulletList"]
  N66_A --> N66_B
  N67_A["renderProjectOverview"]
  N67_B["heading"]
  N67_A --> N67_B
  N68_A["renderProjectOverview"]
  N68_B["isInternalResource"]
  N68_A --> N68_B
  N69_A["renderProjectOverview"]
  N69_B["numberedList"]
  N69_A --> N69_B
  N70_A["renderProjectOverview"]
  N70_B["table"]
  N70_A --> N70_B
  N71_A["renderArchitecture"]
  N71_B["bulletList"]
  N71_A --> N71_B
  N72_A["renderArchitecture"]
  N72_B["formatMethodName"]
  N72_A --> N72_B
  N73_A["renderArchitecture"]
  N73_B["heading"]
  N73_A --> N73_B
  N74_A["renderArchitecture"]
  N74_B["isInternalResource"]
  N74_A --> N74_B
  N75_A["renderArchitecture"]
  N75_B["table"]
  N75_A --> N75_B
  N76_A["renderModules"]
  N76_B["bulletList"]
  N76_A --> N76_B
  N77_A["renderModules"]
  N77_B["formatMethodHints"]
  N77_A --> N77_B
  N78_A["renderModules"]
  N78_B["heading"]
  N78_A --> N78_B
  N79_A["renderModules"]
  N79_B["selectHighSignalMethods"]
  N79_A --> N79_B
  N80_A["renderModules"]
  N80_B["table"]
  N80_A --> N80_B
  N81_A["selectHighSignalMethods"]
  N81_B["scoreMethodForModuleDocs"]
  N81_A --> N81_B
  N82_A["renderCallGraph"]
  N82_B["escapeMermaid"]
  N82_A --> N82_B
  N83_A["renderCallGraph"]
  N83_B["heading"]
  N83_A --> N83_B
  N84_A["renderCallGraph"]
  N84_B["table"]
  N84_A --> N84_B
  N85_A["renderExecutionFlows"]
  N85_B["bulletList"]
  N85_A --> N85_B
  N86_A["renderExecutionFlows"]
  N86_B["formatMethodName"]
  N86_A --> N86_B
  N87_A["renderExecutionFlows"]
  N87_B["heading"]
  N87_A --> N87_B
  N88_A["renderBusinessFlows"]
  N88_B["bulletList"]
  N88_A --> N88_B
  N89_A["renderBusinessFlows"]
  N89_B["formatMethodName"]
  N89_A --> N89_B
  N90_A["renderBusinessFlows"]
  N90_B["heading"]
  N90_A --> N90_B
  N91_A["renderBusinessFlows"]
  N91_B["matchingNarrativeFlow"]
  N91_A --> N91_B
  N92_A["renderBusinessFlows"]
  N92_B["numberedList"]
  N92_A --> N92_B
  N93_A["renderBusinessFlows"]
  N93_B["table"]
  N93_A --> N93_B
  N94_A["renderEntrypoints"]
  N94_B["formatMethodName"]
  N94_A --> N94_B
  N95_A["renderEntrypoints"]
  N95_B["heading"]
  N95_A --> N95_B
  N96_A["renderEntrypoints"]
  N96_B["table"]
  N96_A --> N96_B
  N97_A["renderDataAndResources"]
  N97_B["heading"]
  N97_A --> N97_B
  N98_A["renderDataAndResources"]
  N98_B["isInternalResource"]
  N98_A --> N98_B
  N99_A["renderDataAndResources"]
  N99_B["table"]
  N99_A --> N99_B
  N100_A["renderMaintenanceGuide"]
  N100_B["bulletList"]
  N100_A --> N100_B
  N101_A["renderMaintenanceGuide"]
  N101_B["heading"]
  N101_A --> N101_B
  N102_A["renderMaintenanceGuide"]
  N102_B["table"]
  N102_A --> N102_B
  N103_A["composeProjectNarrative"]
  N103_B["NarrativeCache#open"]
  N103_A --> N103_B
  N104_A["composeProjectNarrative"]
  N104_B["buildNarrativeContext"]
  N104_A --> N104_B
  N105_A["composeProjectNarrative"]
  N105_B["buildNarrativePrompt"]
  N105_A --> N105_B
  N106_A["composeProjectNarrative"]
  N106_B["createChatModel"]
  N106_A --> N106_B
  N107_A["composeProjectNarrative"]
  N107_B["fallbackNarrative"]
  N107_A --> N107_B
  N108_A["composeProjectNarrative"]
  N108_B["parseNarrativeResponse"]
  N108_A --> N108_B
  N109_A["fallbackNarrative"]
  N109_B["fallbackOperatingModel"]
  N109_A --> N109_B
  N110_A["renderQualityReport"]
  N110_B["buildQualitySummary"]
  N110_A --> N110_B
  N111_A["renderQualityReport"]
  N111_B["bulletList"]
  N111_A --> N111_B
  N112_A["renderQualityReport"]
  N112_B["heading"]
  N112_A --> N112_B
  N113_A["renderQualityReport"]
  N113_B["table"]
  N113_A --> N113_B
  N114_A["buildQualitySummary"]
  N114_B["buildChecks"]
  N114_A --> N114_B
  N115_A["buildQualitySummary"]
  N115_B["calculateScore"]
  N115_A --> N115_B
  N116_A["buildQualitySummary"]
  N116_B["recommendations"]
  N116_A --> N116_B
  N117_A["buildChecks"]
  N117_B["countMatches"]
  N117_A --> N117_B
  N118_A["buildChecks"]
  N118_B["hasRequiredDocs"]
  N118_A --> N118_B
  N119_A["buildChecks"]
  N119_B["isChineseNarrative"]
  N119_A --> N119_B
  N120_A["buildChecks"]
  N120_B["maxDocLength"]
  N120_A --> N120_B
  N121_A["buildChecks"]
  N121_B["methodSummaryCoverageCheck"]
  N121_A --> N121_B
  N122_A["buildSemanticOverview"]
  N122_B["buildBusinessFlows"]
  N122_A --> N122_B
  N123_A["buildSemanticOverview"]
  N123_B["buildFlows"]
  N123_A --> N123_B
  N124_A["buildSemanticOverview"]
  N124_B["buildResourceUsage"]
  N124_A --> N124_B
  N125_A["buildSemanticOverview"]
  N125_B["countEdges"]
  N125_A --> N125_B
  N126_A["buildSemanticOverview"]
  N126_B["groupModules"]
  N126_A --> N126_B
  N127_A["buildSemanticOverview"]
  N127_B["inferPurpose"]
  N127_A --> N127_B
  N128_A["buildBusinessFlows"]
  N128_B["formatMethodName"]
  N128_A --> N128_B
  N129_A["buildBusinessFlows"]
  N129_B["walkFlow"]
  N129_A --> N129_B
  N130_A["groupModules"]
  N130_B["inferGroupName"]
  N130_A --> N130_B
  N131_A["groupModules"]
  N131_B["summarizeGroup"]
  N131_A --> N131_B
  N132_A["groupModules"]
  N132_B["summarizeResponsibilities"]
  N132_A --> N132_B
  N133_A["inferGroupName"]
  N133_B["inferJavaGroupName"]
  N133_A --> N133_B
  N134_A["inferPurpose"]
  N134_B["collectResourceNames"]
  N134_A --> N134_B
  N135_A["inferPurpose"]
  N135_B["formatChineseList"]
  N135_A --> N135_B
  N136_A["buildFlows"]
  N136_B["formatMethodName"]
  N136_A --> N136_B
  N137_A["buildFlows"]
  N137_B["walkFlow"]
  N137_A --> N137_B
  N138_A["buildResourceUsage"]
  N138_B["isInternalResource"]
  N138_A --> N138_B
  N139_A["buildRelationGraph"]
  N139_B["buildMethodNameIndex"]
  N139_A --> N139_B
  N140_A["buildRelationGraph"]
  N140_B["dedupeEdges"]
  N140_A --> N140_B
  N141_A["buildRelationGraph"]
  N141_B["relationKindForResource"]
  N141_A --> N141_B
  N142_A["buildRelationGraph"]
  N142_B["resolveCallTarget"]
  N142_A --> N142_B
  N143_A["buildRelationGraph"]
  N143_B["scoreCall"]
  N143_A --> N143_B
  N144_A["buildRelationGraph"]
  N144_B["stableId"]
  N144_A --> N144_B
  N145_A["extractResources"]
  N145_B["resourceKind"]
  N145_A --> N145_B
  N146_A["extractResources"]
  N146_B["stableId"]
  N146_A --> N146_B
  N147_A["main"]
  N147_B["normalizeProvider"]
  N147_A --> N147_B
  N148_A["main"]
  N148_B["parseCliArgs"]
  N148_A --> N148_B
  N149_A["main"]
  N149_B["printHelp"]
  N149_A --> N149_B
  N150_A["main"]
  N150_B["runAnalyzeCommand"]
  N150_A --> N150_B
  N151_A["main"]
  N151_B["runDoctorCommand"]
  N151_A --> N151_B
  N152_A["main"]
  N152_B["runInitCommand"]
  N152_A --> N152_B
  N153_A["main"]
  N153_B["runInteractiveCommand"]
  N153_A --> N153_B
  N154_A["enrichModulesWithMethodSemantics"]
  N154_B["MethodSemanticCache#open"]
  N154_A --> N154_B
  N155_A["enrichModulesWithMethodSemantics"]
  N155_B["analyzeMethodWithLlm"]
  N155_A --> N155_B
  N156_A["enrichModulesWithMethodSemantics"]
  N156_B["createChatModel"]
  N156_A --> N156_B
  N157_A["enrichModulesWithMethodSemantics"]
  N157_B["formatError"]
  N157_A --> N157_B
  N158_A["enrichModulesWithMethodSemantics"]
  N158_B["heuristicSemantic"]
  N158_A --> N158_B
  N159_A["enrichModulesWithMethodSemantics"]
  N159_B["mapWithConcurrency"]
  N159_A --> N159_B
  N160_A["enrichModulesWithMethodSemantics"]
  N160_B["summarizeModuleFromMethods"]
  N160_A --> N160_B
  N161_A["attachHeuristicSemantics"]
  N161_B["heuristicSemantic"]
  N161_A --> N161_B
  N162_A["analyzeMethodWithLlm"]
  N162_B["buildPrompt"]
  N162_A --> N162_B
  N163_A["analyzeMethodWithLlm"]
  N163_B["parseModelResponse"]
  N163_A --> N163_B
  N164_A["parseModelResponse"]
  N164_B["normalizeSemantic"]
  N164_A --> N164_B
  N165_A["buildPrompt"]
  N165_B["trimSource"]
  N165_A --> N165_B
  N166_A["loadModelConfig"]
  N166_B["defaultBaseUrl"]
  N166_A --> N166_B
  N167_A["loadModelConfig"]
  N167_B["getApiKey"]
  N167_A --> N167_B
  N168_A["loadModelConfig"]
  N168_B["parseInteger"]
  N168_A --> N168_B
  N169_A["loadModelConfig"]
  N169_B["parseNumber"]
  N169_A --> N169_B
  N170_A["loadModelConfig"]
  N170_B["parseOptionalInteger"]
  N170_A --> N170_B
  N171_A["writeResultJson"]
  N171_B["buildResultDiff"]
  N171_A --> N171_B
  N172_A["writeResultJson"]
  N172_B["renderChangeSummary"]
  N172_A --> N172_B
  N173_A["writeResultJson"]
  N173_B["toResultJson"]
  N173_A --> N173_B
  N174_A["toResultJson"]
  N174_B["toPosixPath"]
  N174_A --> N174_B
  N175_A["serializeEntrypoint"]
  N175_B["methodRef"]
  N175_A --> N175_B
  N176_A["serializeFlow"]
  N176_B["methodRef"]
  N176_A --> N176_B
  N177_A["serializeBusinessFlow"]
  N177_B["methodRef"]
  N177_A --> N177_B
  N178_A["methodRef"]
  N178_B["formatMethodName"]
  N178_A --> N178_B
  N179_A["buildResultDiff"]
  N179_B["businessFlows"]
  N179_A --> N179_B
  N180_A["buildResultDiff"]
  N180_B["diffByKey"]
  N180_A --> N180_B
  N181_A["buildResultDiff"]
  N181_B["emptyBaselineDiff"]
  N181_A --> N181_B
  N182_A["buildResultDiff"]
  N182_B["entrypoints"]
  N182_A --> N182_B
  N183_A["buildResultDiff"]
  N183_B["files"]
  N183_A --> N183_B
  N184_A["buildResultDiff"]
  N184_B["methods"]
  N184_A --> N184_B
  N185_A["buildResultDiff"]
  N185_B["qualityScore"]
  N185_A --> N185_B
  N186_A["buildResultDiff"]
  N186_B["resources"]
  N186_A --> N186_B
  N187_A["buildResultDiff"]
  N187_B["stableStringify"]
  N187_A --> N187_B
  N188_A["buildResultDiff"]
  N188_B["stringField"]
  N188_A --> N188_B
  N189_A["emptyBaselineDiff"]
  N189_B["emptyChangeSet"]
  N189_A --> N189_B
  N190_A["emptyBaselineDiff"]
  N190_B["qualityScore"]
  N190_A --> N190_B
  N191_A["emptyBaselineDiff"]
  N191_B["stringField"]
  N191_A --> N191_B
  N192_A["files"]
  N192_B["arrayField"]
  N192_A --> N192_B
  N193_A["files"]
  N193_B["numberValue"]
  N193_A --> N193_B
  N194_A["files"]
  N194_B["stringValue"]
  N194_A --> N194_B
  N195_A["methods"]
  N195_B["arrayField"]
  N195_A --> N195_B
  N196_A["methods"]
  N196_B["stringValue"]
  N196_A --> N196_B
  N197_A["entrypoints"]
  N197_B["arrayField"]
  N197_A --> N197_B
  N198_A["entrypoints"]
  N198_B["methods"]
  N198_A --> N198_B
  N199_A["entrypoints"]
  N199_B["stringValue"]
  N199_A --> N199_B
  N200_A["resources"]
  N200_B["arrayField"]
  N200_A --> N200_B
  N201_A["businessFlows"]
  N201_B["arrayField"]
  N201_A --> N201_B
  N202_A["businessFlows"]
  N202_B["objectField"]
  N202_A --> N202_B
  N203_A["renderChangeSummary"]
  N203_B["renderEntrypointList"]
  N203_A --> N203_B
  N204_A["renderChangeSummary"]
  N204_B["renderMethodList"]
  N204_A --> N204_B
  N205_A["renderChangeSummary"]
  N205_B["renderStringChange"]
  N205_A --> N205_B
  N206_A["qualityScore"]
  N206_B["numberValue"]
  N206_A --> N206_B
  N207_A["qualityScore"]
  N207_B["objectField"]
  N207_A --> N207_B
  N208_A["stringField"]
  N208_B["stringValue"]
  N208_A --> N208_B
  N209_A["stableStringify"]
  N209_B["stableStringify"]
  N209_A --> N209_B
  N210_A["parseJavaModule"]
  N210_B["buildClassResourceIndex"]
  N210_A --> N210_B
  N211_A["parseJavaModule"]
  N211_B["buildLineIndex"]
  N211_A --> N211_B
  N212_A["parseJavaModule"]
  N212_B["extractClassBlocks"]
  N212_A --> N212_B
  N213_A["parseJavaModule"]
  N213_B["maskJavaSource"]
  N213_A --> N213_B
  N214_A["parseJavaModule"]
  N214_B["stableId"]
  N214_A --> N214_B
  N215_A["extractClassBlocks"]
  N215_B["findMatchingBrace"]
  N215_A --> N215_B
  N216_A["extractClassUnit"]
  N216_B["buildMethodReturnTypeIndex"]
  N216_A --> N216_B
  N217_A["extractClassUnit"]
  N217_B["buildMethodUnit"]
  N217_A --> N217_B
  N218_A["extractClassUnit"]
  N218_B["extractClassResources"]
  N218_A --> N218_B
  N219_A["extractClassUnit"]
  N219_B["extractFieldTypes"]
  N219_A --> N219_B
  N220_A["extractClassUnit"]
  N220_B["extractMethodBlocks"]
  N220_A --> N220_B
  N221_A["extractClassUnit"]
  N221_B["locationFromOffsets"]
  N221_A --> N221_B
  N222_A["extractClassUnit"]
  N222_B["requestMappingPath"]
  N222_A --> N222_B
  N223_A["extractClassUnit"]
  N223_B["stableId"]
  N223_A --> N223_B
  N224_A["extractClassUnit"]
  N224_B["summarizeClass"]
  N224_A --> N224_B
  N225_A["extractClassResources"]
  N225_B["annotationAttribute"]
  N225_A --> N225_B
  N226_A["extractClassResources"]
  N226_B["annotationByName"]
  N226_A --> N226_B
  N227_A["extractClassResources"]
  N227_B["hasAnnotation"]
  N227_A --> N227_B
  N228_A["extractClassResources"]
  N228_B["isRepositoryClass"]
  N228_A --> N228_B
  N229_A["buildClassResourceIndex"]
  N229_B["extractClassResources"]
  N229_A --> N229_B
  N230_A["isRepositoryClass"]
  N230_B["hasAnnotation"]
  N230_A --> N230_B
  N231_A["buildMethodReturnTypeIndex"]
  N231_B["normalizeJavaType"]
  N231_A --> N231_B
  N232_A["extractMethodBlocks"]
  N232_B["findMatchingBrace"]
  N232_A --> N232_B
  N233_A["extractMethodBlocks"]
  N233_B["leadingWhitespaceLength"]
  N233_A --> N233_B
  N234_A["extractMethodBlocks"]
  N234_B["parseMethodHeader"]
  N234_A --> N234_B
  N235_A["parseMethodHeader"]
  N235_B["parseParameters"]
  N235_A --> N235_B
  N236_A["parseMethodHeader"]
  N236_B["stripAnnotations"]
  N236_A --> N236_B
  N237_A["buildMethodUnit"]
  N237_B["buildReceiverTypeIndex"]
  N237_A --> N237_B
  N238_A["buildMethodUnit"]
  N238_B["locationFromOffsets"]
  N238_A --> N238_B
  N239_A["buildMethodUnit"]
  N239_B["stableId"]
  N239_A --> N239_B
  N240_A["extractCalls"]
  N240_B["normalizeReceiverCall"]
  N240_A --> N240_B
  N241_A["buildReceiverTypeIndex"]
  N241_B["extractLocalVariableTypes"]
  N241_A --> N241_B
  N242_A["buildReceiverTypeIndex"]
  N242_B["normalizeJavaType"]
  N242_A --> N242_B
  N243_A["extractResources"]
  N243_B["extractRepositoryOperationResources"]
  N243_A --> N243_B
  N244_A["extractResources"]
  N244_B["extractStringLiterals"]
  N244_A --> N244_B
  N245_A["extractRepositoryOperationResources"]
  N245_B["isPersistenceReceiver"]
  N245_A --> N245_B
  N246_A["extractRepositoryOperationResources"]
  N246_B["relatedResourcesForType"]
  N246_A --> N246_B
  N247_A["extractFrameworkHints"]
  N247_B["annotationAttribute"]
  N247_A --> N247_B
  N248_A["extractFrameworkHints"]
  N248_B["annotationByName"]
  N248_A --> N248_B
  N249_A["extractFrameworkHints"]
  N249_B["firstAnnotationString"]
  N249_A --> N249_B
  N250_A["extractFrameworkHints"]
  N250_B["hasAnnotation"]
  N250_A --> N250_B
  N251_A["extractFrameworkHints"]
  N251_B["isRepositoryClass"]
  N251_A --> N251_B
  N252_A["extractFrameworkHints"]
  N252_B["routeFromAnnotations"]
  N252_A --> N252_B
  N253_A["extractEntrypointHints"]
  N253_B["hasAnnotation"]
  N253_A --> N253_B
  N254_A["routeFromAnnotations"]
  N254_B["annotationAttribute"]
  N254_A --> N254_B
  N255_A["routeFromAnnotations"]
  N255_B["annotationName"]
  N255_A --> N255_B
  N256_A["routeFromAnnotations"]
  N256_B["firstAnnotationString"]
  N256_A --> N256_B
  N257_A["routeFromAnnotations"]
  N257_B["joinRoutePaths"]
  N257_A --> N257_B
  N258_A["routeFromAnnotations"]
  N258_B["requestMappingMethod"]
  N258_A --> N258_B
  N259_A["requestMappingPath"]
  N259_B["annotationAttribute"]
  N259_A --> N259_B
  N260_A["requestMappingPath"]
  N260_B["annotationName"]
  N260_A --> N260_B
  N261_A["requestMappingPath"]
  N261_B["firstAnnotationString"]
  N261_A --> N261_B
  N262_A["parseParameters"]
  N262_B["splitTopLevel"]
  N262_A --> N262_B
  N263_A["parseParameters"]
  N263_B["stripAnnotations"]
  N263_A --> N263_B
  N264_A["extractFieldTypes"]
  N264_B["findMatchingBrace"]
  N264_A --> N264_B
  N265_A["extractFieldTypes"]
  N265_B["parseFieldStatement"]
  N265_A --> N265_B
  N266_A["extractLocalVariableTypes"]
  N266_B["normalizeJavaType"]
  N266_A --> N266_B
  N267_A["extractLocalVariableTypes"]
  N267_B["normalizeReceiverCall"]
  N267_A --> N267_B
  N268_A["parseFieldStatement"]
  N268_B["normalizeJavaType"]
  N268_A --> N268_B
  N269_A["parseFieldStatement"]
  N269_B["splitTopLevel"]
  N269_A --> N269_B
  N270_A["parseFieldStatement"]
  N270_B["stripAnnotations"]
  N270_A --> N270_B
  N271_A["hasAnnotation"]
  N271_B["annotationName"]
  N271_A --> N271_B
  N272_A["annotationByName"]
  N272_B["annotationName"]
  N272_A --> N272_B
  N273_A["locationFromOffsets"]
  N273_B["lineNumberAt"]
  N273_A --> N273_B
  N274_A["parseModules"]
  N274_B["findParserAdapter"]
  N274_A --> N274_B
  N275_A["parseModules"]
  N275_B["stableId"]
  N275_A --> N275_B
  N276_A["parseTypeScriptModule"]
  N276_B["extractFunctionUnit"]
  N276_A --> N276_B
  N277_A["parseTypeScriptModule"]
  N277_B["extractVariableFunctionUnit"]
  N277_A --> N277_B
  N278_A["parseTypeScriptModule"]
  N278_B["stableId"]
  N278_A --> N278_B
  N279_A["parseTypeScriptModule"]
  N279_B["summarizeModule"]
  N279_A --> N279_B
  N280_A["extractClassUnit"]
  N280_B["extractCallableUnit"]
  N280_A --> N280_B
  N281_A["extractClassUnit"]
  N281_B["getLocation"]
  N281_A --> N281_B
  N282_A["extractClassUnit"]
  N282_B["stableId"]
  N282_A --> N282_B
  N283_A["extractFunctionUnit"]
  N283_B["extractCallableUnit"]
  N283_A --> N283_B
  N284_A["extractVariableFunctionUnit"]
  N284_B["extractCallableUnit"]
  N284_A --> N284_B
  N285_A["extractCallableUnit"]
  N285_B["buildSignature"]
  N285_A --> N285_B
  N286_A["extractCallableUnit"]
  N286_B["extractParameters"]
  N286_A --> N286_B
  N287_A["extractCallableUnit"]
  N287_B["getLocation"]
  N287_A --> N287_B
  N288_A["extractCallableUnit"]
  N288_B["hasModifier"]
  N288_A --> N288_B
  N289_A["extractCallableUnit"]
  N289_B["isJavaScriptFile"]
  N289_A --> N289_B
  N290_A["extractCallableUnit"]
  N290_B["stableId"]
  N290_A --> N290_B
  N291_A["extractVisibility"]
  N291_B["hasModifier"]
  N291_A --> N291_B
  N292_A["extractCalls"]
  N292_B["formatCallExpression"]
  N292_A --> N292_B
  N293_A["extractFrameworkHints"]
  N293_B["literalText"]
  N293_A --> N293_B
  N294_A["extractFrameworkHints"]
  N294_B["parseHttpRouteCall"]
  N294_A --> N294_B
  N295_A["extractEntrypointHints"]
  N295_B["parseHttpRouteCall"]
  N295_A --> N295_B
  N296_A["parseHttpRouteCall"]
  N296_B["literalText"]
  N296_A --> N296_B
  N297_A["scanRepo"]
  N297_B["detectLanguage"]
  N297_A --> N297_B
  N298_A["scanRepo"]
  N298_B["matchesAnyExclude"]
  N298_A --> N298_B
  N299_A["scanRepo"]
  N299_B["toPosixPath"]
  N299_A --> N299_B
  N300_A["matchesAnyExclude"]
  N300_B["matchesExclude"]
  N300_A --> N300_B
  N301_A["matchesExclude"]
  N301_B["escapeRegex"]
  N301_A --> N301_B
  N302_A["matchesExclude"]
  N302_B["toPosixPath"]
  N302_A --> N302_B
  N303_A["readJson"]
  N303_B["readJsonAt"]
  N303_A --> N303_B
  N304_A["generateFixtureOutput"]
  N304_B["analyzeRepo"]
  N304_A --> N304_B
  N305_A["generateFixtureOutput"]
  N305_B["generateDocs"]
  N305_A --> N305_B
  N306_A["generateFixtureOutput"]
  N306_B["writeResultJson"]
  N306_A --> N306_B
  N307_A["assertSchema"]
  N307_B["assertSchema"]
  N307_A --> N307_B
  N308_A["assertSchema"]
  N308_B["typeOf"]
  N308_A --> N308_B
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
| runAnalyzeCommand | analyzeRepo | analyzeRepo | 1 |
| runAnalyzeCommand | generateDocs | generateDocs | 1 |
| runAnalyzeCommand | loadModelConfig | loadModelConfig | 1 |
| runAnalyzeCommand | loadProjectConfig | loadProjectConfig | 1 |
| runAnalyzeCommand | writeResultJson | writeResultJson | 3 |
| parseCliArgs | commandFrom | commandFrom | 1 |
| parseCliArgs | parsePositiveInteger | parsePositiveInteger | 1 |
| parseCliArgs | requireValue | requireValue | 1 |
| runDoctorCommand | collectDoctorChecks | collectDoctorChecks | 1 |
| runDoctorCommand | formatStatus | formatStatus | 1 |
| collectDoctorChecks | isDirectory | isDirectory | 1 |
| collectDoctorChecks | loadModelConfig | loadModelConfig | 1 |
| collectDoctorChecks | loadProjectConfig | loadProjectConfig | 1 |
| isDirectory | isDirectory | isDirectory | 1 |
| runInitCommand | writeProjectConfig | writeProjectConfig | 3 |
| writeProjectConfig | buildProjectConfig | buildProjectConfig | 1 |
| writeProjectConfig | exists | exists | 1 |
| runInteractiveCommand | ask | ask | 1 |
| runInteractiveCommand | askSecret | askSecret | 1 |
| runInteractiveCommand | askYesNo | askYesNo | 1 |
| runInteractiveCommand | loadModelConfig | loadModelConfig | 1 |
| runInteractiveCommand | loadProjectConfig | loadProjectConfig | 1 |
| runInteractiveCommand | normalizeProvider | normalizeProvider | 1 |
| runInteractiveCommand | runAnalyzeCommand | runAnalyzeCommand | 1 |
| runInteractiveCommand | runDoctorCommand | runDoctorCommand | 1 |
| runInteractiveCommand | runInitCommand | runInitCommand | 1 |
| askSecret | ask | ask | 1 |
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
| main | normalizeProvider | normalizeProvider | 1 |
| main | parseCliArgs | parseCliArgs | 1 |
| main | printHelp | printHelp | 1 |
| main | runAnalyzeCommand | runAnalyzeCommand | 1 |
| main | runDoctorCommand | runDoctorCommand | 1 |
| main | runInitCommand | runInitCommand | 1 |
| main | runInteractiveCommand | runInteractiveCommand | 1 |
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
| extractClassResources | isRepositoryClass | isRepositoryClass | 1 |
| buildClassResourceIndex | extractClassResources | extractClassResources | 1 |
| isRepositoryClass | hasAnnotation | hasAnnotation | 1 |
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
| extractFrameworkHints | isRepositoryClass | isRepositoryClass | 1 |
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
