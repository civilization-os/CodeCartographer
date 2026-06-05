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
  N50_B["renderAiContext"]
  N50_A --> N50_B
  N51_A["generateDocs"]
  N51_B["renderArchitecture"]
  N51_A --> N51_B
  N52_A["generateDocs"]
  N52_B["renderBusinessFlows"]
  N52_A --> N52_B
  N53_A["generateDocs"]
  N53_B["renderCallGraph"]
  N53_A --> N53_B
  N54_A["generateDocs"]
  N54_B["renderDataAndResources"]
  N54_A --> N54_B
  N55_A["generateDocs"]
  N55_B["renderDocIndex"]
  N55_A --> N55_B
  N56_A["generateDocs"]
  N56_B["renderEntrypoints"]
  N56_A --> N56_B
  N57_A["generateDocs"]
  N57_B["renderExecutionFlows"]
  N57_A --> N57_B
  N58_A["generateDocs"]
  N58_B["renderMaintenanceGuide"]
  N58_A --> N58_B
  N59_A["generateDocs"]
  N59_B["renderModules"]
  N59_A --> N59_B
  N60_A["generateDocs"]
  N60_B["renderProjectOverview"]
  N60_A --> N60_B
  N61_A["generateDocs"]
  N61_B["renderQualityReport"]
  N61_A --> N61_B
  N62_A["generateDocs"]
  N62_B["renderSystemMap"]
  N62_A --> N62_B
  N63_A["renderDocIndex"]
  N63_B["bulletList"]
  N63_A --> N63_B
  N64_A["renderDocIndex"]
  N64_B["heading"]
  N64_A --> N64_B
  N65_A["renderDocIndex"]
  N65_B["isInternalResource"]
  N65_A --> N65_B
  N66_A["renderDocIndex"]
  N66_B["numberedList"]
  N66_A --> N66_B
  N67_A["renderDocIndex"]
  N67_B["table"]
  N67_A --> N67_B
  N68_A["renderSystemMap"]
  N68_B["bulletList"]
  N68_A --> N68_B
  N69_A["renderSystemMap"]
  N69_B["formatMethodName"]
  N69_A --> N69_B
  N70_A["renderSystemMap"]
  N70_B["heading"]
  N70_A --> N70_B
  N71_A["renderSystemMap"]
  N71_B["isInternalResource"]
  N71_A --> N71_B
  N72_A["renderSystemMap"]
  N72_B["numberedList"]
  N72_A --> N72_B
  N73_A["renderSystemMap"]
  N73_B["table"]
  N73_A --> N73_B
  N74_A["renderAiContext"]
  N74_B["bulletList"]
  N74_A --> N74_B
  N75_A["renderAiContext"]
  N75_B["formatMethodName"]
  N75_A --> N75_B
  N76_A["renderAiContext"]
  N76_B["heading"]
  N76_A --> N76_B
  N77_A["renderAiContext"]
  N77_B["isInternalResource"]
  N77_A --> N77_B
  N78_A["renderAiContext"]
  N78_B["table"]
  N78_A --> N78_B
  N79_A["renderProjectOverview"]
  N79_B["bulletList"]
  N79_A --> N79_B
  N80_A["renderProjectOverview"]
  N80_B["heading"]
  N80_A --> N80_B
  N81_A["renderProjectOverview"]
  N81_B["isInternalResource"]
  N81_A --> N81_B
  N82_A["renderProjectOverview"]
  N82_B["numberedList"]
  N82_A --> N82_B
  N83_A["renderProjectOverview"]
  N83_B["table"]
  N83_A --> N83_B
  N84_A["renderArchitecture"]
  N84_B["bulletList"]
  N84_A --> N84_B
  N85_A["renderArchitecture"]
  N85_B["formatMethodName"]
  N85_A --> N85_B
  N86_A["renderArchitecture"]
  N86_B["heading"]
  N86_A --> N86_B
  N87_A["renderArchitecture"]
  N87_B["isInternalResource"]
  N87_A --> N87_B
  N88_A["renderArchitecture"]
  N88_B["table"]
  N88_A --> N88_B
  N89_A["renderModules"]
  N89_B["bulletList"]
  N89_A --> N89_B
  N90_A["renderModules"]
  N90_B["formatMethodHints"]
  N90_A --> N90_B
  N91_A["renderModules"]
  N91_B["heading"]
  N91_A --> N91_B
  N92_A["renderModules"]
  N92_B["selectHighSignalMethods"]
  N92_A --> N92_B
  N93_A["renderModules"]
  N93_B["table"]
  N93_A --> N93_B
  N94_A["selectHighSignalMethods"]
  N94_B["scoreMethodForModuleDocs"]
  N94_A --> N94_B
  N95_A["renderCallGraph"]
  N95_B["escapeMermaid"]
  N95_A --> N95_B
  N96_A["renderCallGraph"]
  N96_B["heading"]
  N96_A --> N96_B
  N97_A["renderCallGraph"]
  N97_B["table"]
  N97_A --> N97_B
  N98_A["renderExecutionFlows"]
  N98_B["bulletList"]
  N98_A --> N98_B
  N99_A["renderExecutionFlows"]
  N99_B["formatMethodName"]
  N99_A --> N99_B
  N100_A["renderExecutionFlows"]
  N100_B["heading"]
  N100_A --> N100_B
  N101_A["renderBusinessFlows"]
  N101_B["bulletList"]
  N101_A --> N101_B
  N102_A["renderBusinessFlows"]
  N102_B["formatMethodName"]
  N102_A --> N102_B
  N103_A["renderBusinessFlows"]
  N103_B["heading"]
  N103_A --> N103_B
  N104_A["renderBusinessFlows"]
  N104_B["matchingNarrativeFlow"]
  N104_A --> N104_B
  N105_A["renderBusinessFlows"]
  N105_B["numberedList"]
  N105_A --> N105_B
  N106_A["renderBusinessFlows"]
  N106_B["table"]
  N106_A --> N106_B
  N107_A["renderEntrypoints"]
  N107_B["formatMethodName"]
  N107_A --> N107_B
  N108_A["renderEntrypoints"]
  N108_B["heading"]
  N108_A --> N108_B
  N109_A["renderEntrypoints"]
  N109_B["table"]
  N109_A --> N109_B
  N110_A["renderDataAndResources"]
  N110_B["heading"]
  N110_A --> N110_B
  N111_A["renderDataAndResources"]
  N111_B["isInternalResource"]
  N111_A --> N111_B
  N112_A["renderDataAndResources"]
  N112_B["table"]
  N112_A --> N112_B
  N113_A["renderMaintenanceGuide"]
  N113_B["bulletList"]
  N113_A --> N113_B
  N114_A["renderMaintenanceGuide"]
  N114_B["heading"]
  N114_A --> N114_B
  N115_A["renderMaintenanceGuide"]
  N115_B["table"]
  N115_A --> N115_B
  N116_A["composeProjectNarrative"]
  N116_B["NarrativeCache#open"]
  N116_A --> N116_B
  N117_A["composeProjectNarrative"]
  N117_B["buildNarrativeContext"]
  N117_A --> N117_B
  N118_A["composeProjectNarrative"]
  N118_B["buildNarrativePrompt"]
  N118_A --> N118_B
  N119_A["composeProjectNarrative"]
  N119_B["createChatModel"]
  N119_A --> N119_B
  N120_A["composeProjectNarrative"]
  N120_B["fallbackNarrative"]
  N120_A --> N120_B
  N121_A["composeProjectNarrative"]
  N121_B["parseNarrativeResponse"]
  N121_A --> N121_B
  N122_A["fallbackNarrative"]
  N122_B["fallbackOperatingModel"]
  N122_A --> N122_B
  N123_A["renderQualityReport"]
  N123_B["buildQualitySummary"]
  N123_A --> N123_B
  N124_A["renderQualityReport"]
  N124_B["bulletList"]
  N124_A --> N124_B
  N125_A["renderQualityReport"]
  N125_B["heading"]
  N125_A --> N125_B
  N126_A["renderQualityReport"]
  N126_B["table"]
  N126_A --> N126_B
  N127_A["buildQualitySummary"]
  N127_B["buildChecks"]
  N127_A --> N127_B
  N128_A["buildQualitySummary"]
  N128_B["calculateScore"]
  N128_A --> N128_B
  N129_A["buildQualitySummary"]
  N129_B["recommendations"]
  N129_A --> N129_B
  N130_A["buildChecks"]
  N130_B["countMatches"]
  N130_A --> N130_B
  N131_A["buildChecks"]
  N131_B["hasRequiredDocs"]
  N131_A --> N131_B
  N132_A["buildChecks"]
  N132_B["isChineseNarrative"]
  N132_A --> N132_B
  N133_A["buildChecks"]
  N133_B["maxDocLength"]
  N133_A --> N133_B
  N134_A["buildChecks"]
  N134_B["methodSummaryCoverageCheck"]
  N134_A --> N134_B
  N135_A["buildSemanticOverview"]
  N135_B["buildBusinessFlows"]
  N135_A --> N135_B
  N136_A["buildSemanticOverview"]
  N136_B["buildFlows"]
  N136_A --> N136_B
  N137_A["buildSemanticOverview"]
  N137_B["buildResourceUsage"]
  N137_A --> N137_B
  N138_A["buildSemanticOverview"]
  N138_B["countEdges"]
  N138_A --> N138_B
  N139_A["buildSemanticOverview"]
  N139_B["groupModules"]
  N139_A --> N139_B
  N140_A["buildSemanticOverview"]
  N140_B["inferPurpose"]
  N140_A --> N140_B
  N141_A["buildBusinessFlows"]
  N141_B["formatMethodName"]
  N141_A --> N141_B
  N142_A["buildBusinessFlows"]
  N142_B["walkFlow"]
  N142_A --> N142_B
  N143_A["groupModules"]
  N143_B["inferGroupName"]
  N143_A --> N143_B
  N144_A["groupModules"]
  N144_B["summarizeGroup"]
  N144_A --> N144_B
  N145_A["groupModules"]
  N145_B["summarizeResponsibilities"]
  N145_A --> N145_B
  N146_A["inferGroupName"]
  N146_B["inferJavaGroupName"]
  N146_A --> N146_B
  N147_A["inferPurpose"]
  N147_B["collectResourceNames"]
  N147_A --> N147_B
  N148_A["inferPurpose"]
  N148_B["formatChineseList"]
  N148_A --> N148_B
  N149_A["buildFlows"]
  N149_B["formatMethodName"]
  N149_A --> N149_B
  N150_A["buildFlows"]
  N150_B["walkFlow"]
  N150_A --> N150_B
  N151_A["buildResourceUsage"]
  N151_B["isInternalResource"]
  N151_A --> N151_B
  N152_A["buildRelationGraph"]
  N152_B["buildMethodNameIndex"]
  N152_A --> N152_B
  N153_A["buildRelationGraph"]
  N153_B["dedupeEdges"]
  N153_A --> N153_B
  N154_A["buildRelationGraph"]
  N154_B["relationKindForResource"]
  N154_A --> N154_B
  N155_A["buildRelationGraph"]
  N155_B["resolveCallTarget"]
  N155_A --> N155_B
  N156_A["buildRelationGraph"]
  N156_B["scoreCall"]
  N156_A --> N156_B
  N157_A["buildRelationGraph"]
  N157_B["stableId"]
  N157_A --> N157_B
  N158_A["extractResources"]
  N158_B["resourceKind"]
  N158_A --> N158_B
  N159_A["extractResources"]
  N159_B["stableId"]
  N159_A --> N159_B
  N160_A["main"]
  N160_B["normalizeProvider"]
  N160_A --> N160_B
  N161_A["main"]
  N161_B["parseCliArgs"]
  N161_A --> N161_B
  N162_A["main"]
  N162_B["printHelp"]
  N162_A --> N162_B
  N163_A["main"]
  N163_B["runAnalyzeCommand"]
  N163_A --> N163_B
  N164_A["main"]
  N164_B["runDoctorCommand"]
  N164_A --> N164_B
  N165_A["main"]
  N165_B["runInitCommand"]
  N165_A --> N165_B
  N166_A["main"]
  N166_B["runInteractiveCommand"]
  N166_A --> N166_B
  N167_A["enrichModulesWithMethodSemantics"]
  N167_B["MethodSemanticCache#open"]
  N167_A --> N167_B
  N168_A["enrichModulesWithMethodSemantics"]
  N168_B["analyzeMethodWithLlm"]
  N168_A --> N168_B
  N169_A["enrichModulesWithMethodSemantics"]
  N169_B["createChatModel"]
  N169_A --> N169_B
  N170_A["enrichModulesWithMethodSemantics"]
  N170_B["formatError"]
  N170_A --> N170_B
  N171_A["enrichModulesWithMethodSemantics"]
  N171_B["heuristicSemantic"]
  N171_A --> N171_B
  N172_A["enrichModulesWithMethodSemantics"]
  N172_B["mapWithConcurrency"]
  N172_A --> N172_B
  N173_A["enrichModulesWithMethodSemantics"]
  N173_B["summarizeModuleFromMethods"]
  N173_A --> N173_B
  N174_A["attachHeuristicSemantics"]
  N174_B["heuristicSemantic"]
  N174_A --> N174_B
  N175_A["analyzeMethodWithLlm"]
  N175_B["buildPrompt"]
  N175_A --> N175_B
  N176_A["analyzeMethodWithLlm"]
  N176_B["parseModelResponse"]
  N176_A --> N176_B
  N177_A["parseModelResponse"]
  N177_B["normalizeSemantic"]
  N177_A --> N177_B
  N178_A["buildPrompt"]
  N178_B["trimSource"]
  N178_A --> N178_B
  N179_A["loadModelConfig"]
  N179_B["defaultBaseUrl"]
  N179_A --> N179_B
  N180_A["loadModelConfig"]
  N180_B["getApiKey"]
  N180_A --> N180_B
  N181_A["loadModelConfig"]
  N181_B["parseInteger"]
  N181_A --> N181_B
  N182_A["loadModelConfig"]
  N182_B["parseNumber"]
  N182_A --> N182_B
  N183_A["loadModelConfig"]
  N183_B["parseOptionalInteger"]
  N183_A --> N183_B
  N184_A["writeResultJson"]
  N184_B["buildResultDiff"]
  N184_A --> N184_B
  N185_A["writeResultJson"]
  N185_B["renderChangeSummary"]
  N185_A --> N185_B
  N186_A["writeResultJson"]
  N186_B["toResultJson"]
  N186_A --> N186_B
  N187_A["toResultJson"]
  N187_B["toPosixPath"]
  N187_A --> N187_B
  N188_A["serializeEntrypoint"]
  N188_B["methodRef"]
  N188_A --> N188_B
  N189_A["serializeFlow"]
  N189_B["methodRef"]
  N189_A --> N189_B
  N190_A["serializeBusinessFlow"]
  N190_B["methodRef"]
  N190_A --> N190_B
  N191_A["methodRef"]
  N191_B["formatMethodName"]
  N191_A --> N191_B
  N192_A["buildResultDiff"]
  N192_B["businessFlows"]
  N192_A --> N192_B
  N193_A["buildResultDiff"]
  N193_B["diffByKey"]
  N193_A --> N193_B
  N194_A["buildResultDiff"]
  N194_B["emptyBaselineDiff"]
  N194_A --> N194_B
  N195_A["buildResultDiff"]
  N195_B["entrypoints"]
  N195_A --> N195_B
  N196_A["buildResultDiff"]
  N196_B["files"]
  N196_A --> N196_B
  N197_A["buildResultDiff"]
  N197_B["methods"]
  N197_A --> N197_B
  N198_A["buildResultDiff"]
  N198_B["qualityScore"]
  N198_A --> N198_B
  N199_A["buildResultDiff"]
  N199_B["resources"]
  N199_A --> N199_B
  N200_A["buildResultDiff"]
  N200_B["stableStringify"]
  N200_A --> N200_B
  N201_A["buildResultDiff"]
  N201_B["stringField"]
  N201_A --> N201_B
  N202_A["emptyBaselineDiff"]
  N202_B["emptyChangeSet"]
  N202_A --> N202_B
  N203_A["emptyBaselineDiff"]
  N203_B["qualityScore"]
  N203_A --> N203_B
  N204_A["emptyBaselineDiff"]
  N204_B["stringField"]
  N204_A --> N204_B
  N205_A["files"]
  N205_B["arrayField"]
  N205_A --> N205_B
  N206_A["files"]
  N206_B["numberValue"]
  N206_A --> N206_B
  N207_A["files"]
  N207_B["stringValue"]
  N207_A --> N207_B
  N208_A["methods"]
  N208_B["arrayField"]
  N208_A --> N208_B
  N209_A["methods"]
  N209_B["stringValue"]
  N209_A --> N209_B
  N210_A["entrypoints"]
  N210_B["arrayField"]
  N210_A --> N210_B
  N211_A["entrypoints"]
  N211_B["methods"]
  N211_A --> N211_B
  N212_A["entrypoints"]
  N212_B["stringValue"]
  N212_A --> N212_B
  N213_A["resources"]
  N213_B["arrayField"]
  N213_A --> N213_B
  N214_A["businessFlows"]
  N214_B["arrayField"]
  N214_A --> N214_B
  N215_A["businessFlows"]
  N215_B["objectField"]
  N215_A --> N215_B
  N216_A["renderChangeSummary"]
  N216_B["renderEntrypointList"]
  N216_A --> N216_B
  N217_A["renderChangeSummary"]
  N217_B["renderMethodList"]
  N217_A --> N217_B
  N218_A["renderChangeSummary"]
  N218_B["renderStringChange"]
  N218_A --> N218_B
  N219_A["qualityScore"]
  N219_B["numberValue"]
  N219_A --> N219_B
  N220_A["qualityScore"]
  N220_B["objectField"]
  N220_A --> N220_B
  N221_A["stringField"]
  N221_B["stringValue"]
  N221_A --> N221_B
  N222_A["stableStringify"]
  N222_B["stableStringify"]
  N222_A --> N222_B
  N223_A["parseJavaModule"]
  N223_B["buildClassResourceIndex"]
  N223_A --> N223_B
  N224_A["parseJavaModule"]
  N224_B["buildLineIndex"]
  N224_A --> N224_B
  N225_A["parseJavaModule"]
  N225_B["extractClassBlocks"]
  N225_A --> N225_B
  N226_A["parseJavaModule"]
  N226_B["maskJavaSource"]
  N226_A --> N226_B
  N227_A["parseJavaModule"]
  N227_B["stableId"]
  N227_A --> N227_B
  N228_A["extractClassBlocks"]
  N228_B["findMatchingBrace"]
  N228_A --> N228_B
  N229_A["extractClassUnit"]
  N229_B["buildMethodReturnTypeIndex"]
  N229_A --> N229_B
  N230_A["extractClassUnit"]
  N230_B["buildMethodUnit"]
  N230_A --> N230_B
  N231_A["extractClassUnit"]
  N231_B["extractClassResources"]
  N231_A --> N231_B
  N232_A["extractClassUnit"]
  N232_B["extractFieldTypes"]
  N232_A --> N232_B
  N233_A["extractClassUnit"]
  N233_B["extractMethodBlocks"]
  N233_A --> N233_B
  N234_A["extractClassUnit"]
  N234_B["locationFromOffsets"]
  N234_A --> N234_B
  N235_A["extractClassUnit"]
  N235_B["requestMappingPath"]
  N235_A --> N235_B
  N236_A["extractClassUnit"]
  N236_B["stableId"]
  N236_A --> N236_B
  N237_A["extractClassUnit"]
  N237_B["summarizeClass"]
  N237_A --> N237_B
  N238_A["extractClassResources"]
  N238_B["annotationAttribute"]
  N238_A --> N238_B
  N239_A["extractClassResources"]
  N239_B["annotationByName"]
  N239_A --> N239_B
  N240_A["extractClassResources"]
  N240_B["hasAnnotation"]
  N240_A --> N240_B
  N241_A["extractClassResources"]
  N241_B["isRepositoryClass"]
  N241_A --> N241_B
  N242_A["buildClassResourceIndex"]
  N242_B["extractClassResources"]
  N242_A --> N242_B
  N243_A["isRepositoryClass"]
  N243_B["hasAnnotation"]
  N243_A --> N243_B
  N244_A["buildMethodReturnTypeIndex"]
  N244_B["normalizeJavaType"]
  N244_A --> N244_B
  N245_A["extractMethodBlocks"]
  N245_B["findMatchingBrace"]
  N245_A --> N245_B
  N246_A["extractMethodBlocks"]
  N246_B["leadingWhitespaceLength"]
  N246_A --> N246_B
  N247_A["extractMethodBlocks"]
  N247_B["parseMethodHeader"]
  N247_A --> N247_B
  N248_A["parseMethodHeader"]
  N248_B["parseParameters"]
  N248_A --> N248_B
  N249_A["parseMethodHeader"]
  N249_B["stripAnnotations"]
  N249_A --> N249_B
  N250_A["buildMethodUnit"]
  N250_B["buildReceiverTypeIndex"]
  N250_A --> N250_B
  N251_A["buildMethodUnit"]
  N251_B["locationFromOffsets"]
  N251_A --> N251_B
  N252_A["buildMethodUnit"]
  N252_B["stableId"]
  N252_A --> N252_B
  N253_A["extractCalls"]
  N253_B["normalizeReceiverCall"]
  N253_A --> N253_B
  N254_A["buildReceiverTypeIndex"]
  N254_B["extractLocalVariableTypes"]
  N254_A --> N254_B
  N255_A["buildReceiverTypeIndex"]
  N255_B["normalizeJavaType"]
  N255_A --> N255_B
  N256_A["extractResources"]
  N256_B["extractRepositoryOperationResources"]
  N256_A --> N256_B
  N257_A["extractResources"]
  N257_B["extractStringLiterals"]
  N257_A --> N257_B
  N258_A["extractRepositoryOperationResources"]
  N258_B["isPersistenceReceiver"]
  N258_A --> N258_B
  N259_A["extractRepositoryOperationResources"]
  N259_B["relatedResourcesForType"]
  N259_A --> N259_B
  N260_A["extractFrameworkHints"]
  N260_B["annotationAttribute"]
  N260_A --> N260_B
  N261_A["extractFrameworkHints"]
  N261_B["annotationByName"]
  N261_A --> N261_B
  N262_A["extractFrameworkHints"]
  N262_B["firstAnnotationString"]
  N262_A --> N262_B
  N263_A["extractFrameworkHints"]
  N263_B["hasAnnotation"]
  N263_A --> N263_B
  N264_A["extractFrameworkHints"]
  N264_B["isRepositoryClass"]
  N264_A --> N264_B
  N265_A["extractFrameworkHints"]
  N265_B["routeFromAnnotations"]
  N265_A --> N265_B
  N266_A["extractEntrypointHints"]
  N266_B["hasAnnotation"]
  N266_A --> N266_B
  N267_A["routeFromAnnotations"]
  N267_B["annotationAttribute"]
  N267_A --> N267_B
  N268_A["routeFromAnnotations"]
  N268_B["annotationName"]
  N268_A --> N268_B
  N269_A["routeFromAnnotations"]
  N269_B["firstAnnotationString"]
  N269_A --> N269_B
  N270_A["routeFromAnnotations"]
  N270_B["joinRoutePaths"]
  N270_A --> N270_B
  N271_A["routeFromAnnotations"]
  N271_B["requestMappingMethod"]
  N271_A --> N271_B
  N272_A["requestMappingPath"]
  N272_B["annotationAttribute"]
  N272_A --> N272_B
  N273_A["requestMappingPath"]
  N273_B["annotationName"]
  N273_A --> N273_B
  N274_A["requestMappingPath"]
  N274_B["firstAnnotationString"]
  N274_A --> N274_B
  N275_A["parseParameters"]
  N275_B["splitTopLevel"]
  N275_A --> N275_B
  N276_A["parseParameters"]
  N276_B["stripAnnotations"]
  N276_A --> N276_B
  N277_A["extractFieldTypes"]
  N277_B["findMatchingBrace"]
  N277_A --> N277_B
  N278_A["extractFieldTypes"]
  N278_B["parseFieldStatement"]
  N278_A --> N278_B
  N279_A["extractLocalVariableTypes"]
  N279_B["normalizeJavaType"]
  N279_A --> N279_B
  N280_A["extractLocalVariableTypes"]
  N280_B["normalizeReceiverCall"]
  N280_A --> N280_B
  N281_A["parseFieldStatement"]
  N281_B["normalizeJavaType"]
  N281_A --> N281_B
  N282_A["parseFieldStatement"]
  N282_B["splitTopLevel"]
  N282_A --> N282_B
  N283_A["parseFieldStatement"]
  N283_B["stripAnnotations"]
  N283_A --> N283_B
  N284_A["hasAnnotation"]
  N284_B["annotationName"]
  N284_A --> N284_B
  N285_A["annotationByName"]
  N285_B["annotationName"]
  N285_A --> N285_B
  N286_A["locationFromOffsets"]
  N286_B["lineNumberAt"]
  N286_A --> N286_B
  N287_A["parseModules"]
  N287_B["findParserAdapter"]
  N287_A --> N287_B
  N288_A["parseModules"]
  N288_B["stableId"]
  N288_A --> N288_B
  N289_A["parseTypeScriptModule"]
  N289_B["extractFunctionUnit"]
  N289_A --> N289_B
  N290_A["parseTypeScriptModule"]
  N290_B["extractVariableFunctionUnit"]
  N290_A --> N290_B
  N291_A["parseTypeScriptModule"]
  N291_B["stableId"]
  N291_A --> N291_B
  N292_A["parseTypeScriptModule"]
  N292_B["summarizeModule"]
  N292_A --> N292_B
  N293_A["extractClassUnit"]
  N293_B["extractCallableUnit"]
  N293_A --> N293_B
  N294_A["extractClassUnit"]
  N294_B["getLocation"]
  N294_A --> N294_B
  N295_A["extractClassUnit"]
  N295_B["stableId"]
  N295_A --> N295_B
  N296_A["extractFunctionUnit"]
  N296_B["extractCallableUnit"]
  N296_A --> N296_B
  N297_A["extractVariableFunctionUnit"]
  N297_B["extractCallableUnit"]
  N297_A --> N297_B
  N298_A["extractCallableUnit"]
  N298_B["buildSignature"]
  N298_A --> N298_B
  N299_A["extractCallableUnit"]
  N299_B["extractParameters"]
  N299_A --> N299_B
  N300_A["extractCallableUnit"]
  N300_B["getLocation"]
  N300_A --> N300_B
  N301_A["extractCallableUnit"]
  N301_B["hasModifier"]
  N301_A --> N301_B
  N302_A["extractCallableUnit"]
  N302_B["isJavaScriptFile"]
  N302_A --> N302_B
  N303_A["extractCallableUnit"]
  N303_B["stableId"]
  N303_A --> N303_B
  N304_A["extractVisibility"]
  N304_B["hasModifier"]
  N304_A --> N304_B
  N305_A["extractCalls"]
  N305_B["formatCallExpression"]
  N305_A --> N305_B
  N306_A["extractFrameworkHints"]
  N306_B["literalText"]
  N306_A --> N306_B
  N307_A["extractFrameworkHints"]
  N307_B["parseHttpRouteCall"]
  N307_A --> N307_B
  N308_A["extractEntrypointHints"]
  N308_B["parseHttpRouteCall"]
  N308_A --> N308_B
  N309_A["parseHttpRouteCall"]
  N309_B["literalText"]
  N309_A --> N309_B
  N310_A["scanRepo"]
  N310_B["detectLanguage"]
  N310_A --> N310_B
  N311_A["scanRepo"]
  N311_B["matchesAnyExclude"]
  N311_A --> N311_B
  N312_A["scanRepo"]
  N312_B["toPosixPath"]
  N312_A --> N312_B
  N313_A["matchesAnyExclude"]
  N313_B["matchesExclude"]
  N313_A --> N313_B
  N314_A["matchesExclude"]
  N314_B["escapeRegex"]
  N314_A --> N314_B
  N315_A["matchesExclude"]
  N315_B["toPosixPath"]
  N315_A --> N315_B
  N316_A["readJson"]
  N316_B["readJsonAt"]
  N316_A --> N316_B
  N317_A["generateFixtureOutput"]
  N317_B["analyzeRepo"]
  N317_A --> N317_B
  N318_A["generateFixtureOutput"]
  N318_B["generateDocs"]
  N318_A --> N318_B
  N319_A["generateFixtureOutput"]
  N319_B["writeResultJson"]
  N319_A --> N319_B
  N320_A["assertSchema"]
  N320_B["assertSchema"]
  N320_A --> N320_B
  N321_A["assertSchema"]
  N321_B["typeOf"]
  N321_A --> N321_B
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
| generateDocs | renderAiContext | renderAiContext | 1 |
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
| generateDocs | renderSystemMap | renderSystemMap | 1 |
| renderDocIndex | bulletList | bulletList | 1 |
| renderDocIndex | heading | heading | 1 |
| renderDocIndex | isInternalResource | isInternalResource | 1 |
| renderDocIndex | numberedList | numberedList | 1 |
| renderDocIndex | table | table | 1 |
| renderSystemMap | bulletList | bulletList | 1 |
| renderSystemMap | formatMethodName | formatMethodName | 1 |
| renderSystemMap | heading | heading | 1 |
| renderSystemMap | isInternalResource | isInternalResource | 1 |
| renderSystemMap | numberedList | numberedList | 1 |
| renderSystemMap | table | table | 1 |
| renderAiContext | bulletList | bulletList | 1 |
| renderAiContext | formatMethodName | formatMethodName | 1 |
| renderAiContext | heading | heading | 1 |
| renderAiContext | isInternalResource | isInternalResource | 1 |
| renderAiContext | table | table | 1 |
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
