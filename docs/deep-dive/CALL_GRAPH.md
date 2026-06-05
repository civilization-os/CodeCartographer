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
  N19_B["applyModelNetworkEnv"]
  N19_A --> N19_B
  N20_A["runAnalyzeCommand"]
  N20_B["generateDocs"]
  N20_A --> N20_B
  N21_A["runAnalyzeCommand"]
  N21_B["loadModelConfig"]
  N21_A --> N21_B
  N22_A["runAnalyzeCommand"]
  N22_B["loadProjectConfig"]
  N22_A --> N22_B
  N23_A["runAnalyzeCommand"]
  N23_B["writeResultJson"]
  N23_A --> N23_B
  N24_A["parseCliArgs"]
  N24_B["commandFrom"]
  N24_A --> N24_B
  N25_A["parseCliArgs"]
  N25_B["parsePositiveInteger"]
  N25_A --> N25_B
  N26_A["parseCliArgs"]
  N26_B["requireValue"]
  N26_A --> N26_B
  N27_A["runDoctorCommand"]
  N27_B["collectDoctorChecks"]
  N27_A --> N27_B
  N28_A["runDoctorCommand"]
  N28_B["formatStatus"]
  N28_A --> N28_B
  N29_A["collectDoctorChecks"]
  N29_B["isDirectory"]
  N29_A --> N29_B
  N30_A["collectDoctorChecks"]
  N30_B["loadModelConfig"]
  N30_A --> N30_B
  N31_A["collectDoctorChecks"]
  N31_B["loadProjectConfig"]
  N31_A --> N31_B
  N32_A["isDirectory"]
  N32_B["isDirectory"]
  N32_A --> N32_B
  N33_A["runInitCommand"]
  N33_B["writeProjectConfig"]
  N33_A --> N33_B
  N34_A["writeProjectConfig"]
  N34_B["buildProjectConfig"]
  N34_A --> N34_B
  N35_A["writeProjectConfig"]
  N35_B["exists"]
  N35_A --> N35_B
  N36_A["runInteractiveCommand"]
  N36_B["ask"]
  N36_A --> N36_B
  N37_A["runInteractiveCommand"]
  N37_B["askSecret"]
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
  N45_A["runModelTestCommand"]
  N45_B["applyModelNetworkEnv"]
  N45_A --> N45_B
  N46_A["runModelTestCommand"]
  N46_B["createChatModel"]
  N46_A --> N46_B
  N47_A["runModelTestCommand"]
  N47_B["loadModelConfig"]
  N47_A --> N47_B
  N48_A["runModelTestCommand"]
  N48_B["loadProjectConfig"]
  N48_A --> N48_B
  N49_A["runModelTestCommand"]
  N49_B["previewResponse"]
  N49_A --> N49_B
  N50_A["runModelTestCommand"]
  N50_B["saveModelDefaults"]
  N50_A --> N50_B
  N51_A["runModelTestCommand"]
  N51_B["shouldSave"]
  N51_A --> N51_B
  N52_A["previewResponse"]
  N52_B["isMessageLike"]
  N52_A --> N52_B
  N53_A["previewResponse"]
  N53_B["truncate"]
  N53_A --> N53_B
  N54_A["loadProjectConfig"]
  N54_B["rejectSensitiveKeys"]
  N54_A --> N54_B
  N55_A["rejectSensitiveKeys"]
  N55_B["rejectSensitiveKeys"]
  N55_A --> N55_B
  N56_A["generateDocs"]
  N56_B["buildQualitySummary"]
  N56_A --> N56_B
  N57_A["generateDocs"]
  N57_B["buildSemanticOverview"]
  N57_A --> N57_B
  N58_A["generateDocs"]
  N58_B["composeProjectNarrative"]
  N58_A --> N58_B
  N59_A["generateDocs"]
  N59_B["renderAiContext"]
  N59_A --> N59_B
  N60_A["generateDocs"]
  N60_B["renderArchitecture"]
  N60_A --> N60_B
  N61_A["generateDocs"]
  N61_B["renderBusinessFlows"]
  N61_A --> N61_B
  N62_A["generateDocs"]
  N62_B["renderCallGraph"]
  N62_A --> N62_B
  N63_A["generateDocs"]
  N63_B["renderDataAndResources"]
  N63_A --> N63_B
  N64_A["generateDocs"]
  N64_B["renderDocIndex"]
  N64_A --> N64_B
  N65_A["generateDocs"]
  N65_B["renderEntrypoints"]
  N65_A --> N65_B
  N66_A["generateDocs"]
  N66_B["renderExecutionFlows"]
  N66_A --> N66_B
  N67_A["generateDocs"]
  N67_B["renderMaintenanceGuide"]
  N67_A --> N67_B
  N68_A["generateDocs"]
  N68_B["renderModules"]
  N68_A --> N68_B
  N69_A["generateDocs"]
  N69_B["renderProjectOverview"]
  N69_A --> N69_B
  N70_A["generateDocs"]
  N70_B["renderQualityReport"]
  N70_A --> N70_B
  N71_A["generateDocs"]
  N71_B["renderSystemMap"]
  N71_A --> N71_B
  N72_A["renderDocIndex"]
  N72_B["bulletList"]
  N72_A --> N72_B
  N73_A["renderDocIndex"]
  N73_B["heading"]
  N73_A --> N73_B
  N74_A["renderDocIndex"]
  N74_B["isInternalResource"]
  N74_A --> N74_B
  N75_A["renderDocIndex"]
  N75_B["numberedList"]
  N75_A --> N75_B
  N76_A["renderDocIndex"]
  N76_B["table"]
  N76_A --> N76_B
  N77_A["renderSystemMap"]
  N77_B["bulletList"]
  N77_A --> N77_B
  N78_A["renderSystemMap"]
  N78_B["formatMethodName"]
  N78_A --> N78_B
  N79_A["renderSystemMap"]
  N79_B["heading"]
  N79_A --> N79_B
  N80_A["renderSystemMap"]
  N80_B["isInternalResource"]
  N80_A --> N80_B
  N81_A["renderSystemMap"]
  N81_B["numberedList"]
  N81_A --> N81_B
  N82_A["renderSystemMap"]
  N82_B["table"]
  N82_A --> N82_B
  N83_A["renderAiContext"]
  N83_B["bulletList"]
  N83_A --> N83_B
  N84_A["renderAiContext"]
  N84_B["formatMethodName"]
  N84_A --> N84_B
  N85_A["renderAiContext"]
  N85_B["heading"]
  N85_A --> N85_B
  N86_A["renderAiContext"]
  N86_B["isInternalResource"]
  N86_A --> N86_B
  N87_A["renderAiContext"]
  N87_B["table"]
  N87_A --> N87_B
  N88_A["renderProjectOverview"]
  N88_B["bulletList"]
  N88_A --> N88_B
  N89_A["renderProjectOverview"]
  N89_B["heading"]
  N89_A --> N89_B
  N90_A["renderProjectOverview"]
  N90_B["isInternalResource"]
  N90_A --> N90_B
  N91_A["renderProjectOverview"]
  N91_B["numberedList"]
  N91_A --> N91_B
  N92_A["renderProjectOverview"]
  N92_B["table"]
  N92_A --> N92_B
  N93_A["renderArchitecture"]
  N93_B["bulletList"]
  N93_A --> N93_B
  N94_A["renderArchitecture"]
  N94_B["formatMethodName"]
  N94_A --> N94_B
  N95_A["renderArchitecture"]
  N95_B["heading"]
  N95_A --> N95_B
  N96_A["renderArchitecture"]
  N96_B["isInternalResource"]
  N96_A --> N96_B
  N97_A["renderArchitecture"]
  N97_B["table"]
  N97_A --> N97_B
  N98_A["renderModules"]
  N98_B["bulletList"]
  N98_A --> N98_B
  N99_A["renderModules"]
  N99_B["formatMethodHints"]
  N99_A --> N99_B
  N100_A["renderModules"]
  N100_B["heading"]
  N100_A --> N100_B
  N101_A["renderModules"]
  N101_B["selectHighSignalMethods"]
  N101_A --> N101_B
  N102_A["renderModules"]
  N102_B["table"]
  N102_A --> N102_B
  N103_A["selectHighSignalMethods"]
  N103_B["scoreMethodForModuleDocs"]
  N103_A --> N103_B
  N104_A["renderCallGraph"]
  N104_B["escapeMermaid"]
  N104_A --> N104_B
  N105_A["renderCallGraph"]
  N105_B["heading"]
  N105_A --> N105_B
  N106_A["renderCallGraph"]
  N106_B["table"]
  N106_A --> N106_B
  N107_A["renderExecutionFlows"]
  N107_B["bulletList"]
  N107_A --> N107_B
  N108_A["renderExecutionFlows"]
  N108_B["formatMethodName"]
  N108_A --> N108_B
  N109_A["renderExecutionFlows"]
  N109_B["heading"]
  N109_A --> N109_B
  N110_A["renderBusinessFlows"]
  N110_B["bulletList"]
  N110_A --> N110_B
  N111_A["renderBusinessFlows"]
  N111_B["formatMethodName"]
  N111_A --> N111_B
  N112_A["renderBusinessFlows"]
  N112_B["heading"]
  N112_A --> N112_B
  N113_A["renderBusinessFlows"]
  N113_B["matchingNarrativeFlow"]
  N113_A --> N113_B
  N114_A["renderBusinessFlows"]
  N114_B["numberedList"]
  N114_A --> N114_B
  N115_A["renderBusinessFlows"]
  N115_B["table"]
  N115_A --> N115_B
  N116_A["renderEntrypoints"]
  N116_B["formatMethodName"]
  N116_A --> N116_B
  N117_A["renderEntrypoints"]
  N117_B["heading"]
  N117_A --> N117_B
  N118_A["renderEntrypoints"]
  N118_B["table"]
  N118_A --> N118_B
  N119_A["renderDataAndResources"]
  N119_B["heading"]
  N119_A --> N119_B
  N120_A["renderDataAndResources"]
  N120_B["isInternalResource"]
  N120_A --> N120_B
  N121_A["renderDataAndResources"]
  N121_B["table"]
  N121_A --> N121_B
  N122_A["renderMaintenanceGuide"]
  N122_B["bulletList"]
  N122_A --> N122_B
  N123_A["renderMaintenanceGuide"]
  N123_B["heading"]
  N123_A --> N123_B
  N124_A["renderMaintenanceGuide"]
  N124_B["table"]
  N124_A --> N124_B
  N125_A["composeProjectNarrative"]
  N125_B["NarrativeCache#open"]
  N125_A --> N125_B
  N126_A["composeProjectNarrative"]
  N126_B["buildNarrativeContext"]
  N126_A --> N126_B
  N127_A["composeProjectNarrative"]
  N127_B["buildNarrativePrompt"]
  N127_A --> N127_B
  N128_A["composeProjectNarrative"]
  N128_B["createChatModel"]
  N128_A --> N128_B
  N129_A["composeProjectNarrative"]
  N129_B["fallbackNarrative"]
  N129_A --> N129_B
  N130_A["composeProjectNarrative"]
  N130_B["parseNarrativeResponse"]
  N130_A --> N130_B
  N131_A["fallbackNarrative"]
  N131_B["fallbackOperatingModel"]
  N131_A --> N131_B
  N132_A["renderQualityReport"]
  N132_B["buildQualitySummary"]
  N132_A --> N132_B
  N133_A["renderQualityReport"]
  N133_B["bulletList"]
  N133_A --> N133_B
  N134_A["renderQualityReport"]
  N134_B["heading"]
  N134_A --> N134_B
  N135_A["renderQualityReport"]
  N135_B["table"]
  N135_A --> N135_B
  N136_A["buildQualitySummary"]
  N136_B["buildChecks"]
  N136_A --> N136_B
  N137_A["buildQualitySummary"]
  N137_B["calculateScore"]
  N137_A --> N137_B
  N138_A["buildQualitySummary"]
  N138_B["recommendations"]
  N138_A --> N138_B
  N139_A["buildChecks"]
  N139_B["countMatches"]
  N139_A --> N139_B
  N140_A["buildChecks"]
  N140_B["hasRequiredDocs"]
  N140_A --> N140_B
  N141_A["buildChecks"]
  N141_B["isChineseNarrative"]
  N141_A --> N141_B
  N142_A["buildChecks"]
  N142_B["maxDocLength"]
  N142_A --> N142_B
  N143_A["buildChecks"]
  N143_B["methodSummaryCoverageCheck"]
  N143_A --> N143_B
  N144_A["buildSemanticOverview"]
  N144_B["buildBusinessFlows"]
  N144_A --> N144_B
  N145_A["buildSemanticOverview"]
  N145_B["buildFlows"]
  N145_A --> N145_B
  N146_A["buildSemanticOverview"]
  N146_B["buildResourceUsage"]
  N146_A --> N146_B
  N147_A["buildSemanticOverview"]
  N147_B["countEdges"]
  N147_A --> N147_B
  N148_A["buildSemanticOverview"]
  N148_B["groupModules"]
  N148_A --> N148_B
  N149_A["buildSemanticOverview"]
  N149_B["inferPurpose"]
  N149_A --> N149_B
  N150_A["buildBusinessFlows"]
  N150_B["formatMethodName"]
  N150_A --> N150_B
  N151_A["buildBusinessFlows"]
  N151_B["walkFlow"]
  N151_A --> N151_B
  N152_A["groupModules"]
  N152_B["inferGroupName"]
  N152_A --> N152_B
  N153_A["groupModules"]
  N153_B["summarizeGroup"]
  N153_A --> N153_B
  N154_A["groupModules"]
  N154_B["summarizeResponsibilities"]
  N154_A --> N154_B
  N155_A["inferGroupName"]
  N155_B["inferJavaGroupName"]
  N155_A --> N155_B
  N156_A["inferPurpose"]
  N156_B["collectResourceNames"]
  N156_A --> N156_B
  N157_A["inferPurpose"]
  N157_B["formatChineseList"]
  N157_A --> N157_B
  N158_A["buildFlows"]
  N158_B["formatMethodName"]
  N158_A --> N158_B
  N159_A["buildFlows"]
  N159_B["walkFlow"]
  N159_A --> N159_B
  N160_A["buildResourceUsage"]
  N160_B["isInternalResource"]
  N160_A --> N160_B
  N161_A["buildRelationGraph"]
  N161_B["buildMethodNameIndex"]
  N161_A --> N161_B
  N162_A["buildRelationGraph"]
  N162_B["dedupeEdges"]
  N162_A --> N162_B
  N163_A["buildRelationGraph"]
  N163_B["relationKindForResource"]
  N163_A --> N163_B
  N164_A["buildRelationGraph"]
  N164_B["resolveCallTarget"]
  N164_A --> N164_B
  N165_A["buildRelationGraph"]
  N165_B["scoreCall"]
  N165_A --> N165_B
  N166_A["buildRelationGraph"]
  N166_B["stableId"]
  N166_A --> N166_B
  N167_A["extractResources"]
  N167_B["resourceKind"]
  N167_A --> N167_B
  N168_A["extractResources"]
  N168_B["stableId"]
  N168_A --> N168_B
  N169_A["main"]
  N169_B["normalizeProvider"]
  N169_A --> N169_B
  N170_A["main"]
  N170_B["parseCliArgs"]
  N170_A --> N170_B
  N171_A["main"]
  N171_B["printHelp"]
  N171_A --> N171_B
  N172_A["main"]
  N172_B["runAnalyzeCommand"]
  N172_A --> N172_B
  N173_A["main"]
  N173_B["runDoctorCommand"]
  N173_A --> N173_B
  N174_A["main"]
  N174_B["runInitCommand"]
  N174_A --> N174_B
  N175_A["main"]
  N175_B["runInteractiveCommand"]
  N175_A --> N175_B
  N176_A["main"]
  N176_B["runModelTestCommand"]
  N176_A --> N176_B
  N177_A["enrichModulesWithMethodSemantics"]
  N177_B["MethodSemanticCache#open"]
  N177_A --> N177_B
  N178_A["enrichModulesWithMethodSemantics"]
  N178_B["analyzeMethodWithLlm"]
  N178_A --> N178_B
  N179_A["enrichModulesWithMethodSemantics"]
  N179_B["createChatModel"]
  N179_A --> N179_B
  N180_A["enrichModulesWithMethodSemantics"]
  N180_B["formatError"]
  N180_A --> N180_B
  N181_A["enrichModulesWithMethodSemantics"]
  N181_B["heuristicSemantic"]
  N181_A --> N181_B
  N182_A["enrichModulesWithMethodSemantics"]
  N182_B["mapWithConcurrency"]
  N182_A --> N182_B
  N183_A["enrichModulesWithMethodSemantics"]
  N183_B["summarizeModuleFromMethods"]
  N183_A --> N183_B
  N184_A["attachHeuristicSemantics"]
  N184_B["heuristicSemantic"]
  N184_A --> N184_B
  N185_A["analyzeMethodWithLlm"]
  N185_B["buildPrompt"]
  N185_A --> N185_B
  N186_A["analyzeMethodWithLlm"]
  N186_B["parseModelResponse"]
  N186_A --> N186_B
  N187_A["parseModelResponse"]
  N187_B["normalizeSemantic"]
  N187_A --> N187_B
  N188_A["buildPrompt"]
  N188_B["trimSource"]
  N188_A --> N188_B
  N189_A["loadModelConfig"]
  N189_B["defaultBaseUrl"]
  N189_A --> N189_B
  N190_A["loadModelConfig"]
  N190_B["getApiKey"]
  N190_A --> N190_B
  N191_A["loadModelConfig"]
  N191_B["parseInteger"]
  N191_A --> N191_B
  N192_A["loadModelConfig"]
  N192_B["parseNumber"]
  N192_A --> N192_B
  N193_A["loadModelConfig"]
  N193_B["parseOptionalInteger"]
  N193_A --> N193_B
  N194_A["createChatModel"]
  N194_B["applyModelNetworkEnv"]
  N194_A --> N194_B
  N195_A["writeResultJson"]
  N195_B["buildResultDiff"]
  N195_A --> N195_B
  N196_A["writeResultJson"]
  N196_B["renderChangeSummary"]
  N196_A --> N196_B
  N197_A["writeResultJson"]
  N197_B["toResultJson"]
  N197_A --> N197_B
  N198_A["toResultJson"]
  N198_B["toPosixPath"]
  N198_A --> N198_B
  N199_A["serializeEntrypoint"]
  N199_B["methodRef"]
  N199_A --> N199_B
  N200_A["serializeFlow"]
  N200_B["methodRef"]
  N200_A --> N200_B
  N201_A["serializeBusinessFlow"]
  N201_B["methodRef"]
  N201_A --> N201_B
  N202_A["methodRef"]
  N202_B["formatMethodName"]
  N202_A --> N202_B
  N203_A["buildResultDiff"]
  N203_B["businessFlows"]
  N203_A --> N203_B
  N204_A["buildResultDiff"]
  N204_B["diffByKey"]
  N204_A --> N204_B
  N205_A["buildResultDiff"]
  N205_B["emptyBaselineDiff"]
  N205_A --> N205_B
  N206_A["buildResultDiff"]
  N206_B["entrypoints"]
  N206_A --> N206_B
  N207_A["buildResultDiff"]
  N207_B["files"]
  N207_A --> N207_B
  N208_A["buildResultDiff"]
  N208_B["methods"]
  N208_A --> N208_B
  N209_A["buildResultDiff"]
  N209_B["qualityScore"]
  N209_A --> N209_B
  N210_A["buildResultDiff"]
  N210_B["resources"]
  N210_A --> N210_B
  N211_A["buildResultDiff"]
  N211_B["stableStringify"]
  N211_A --> N211_B
  N212_A["buildResultDiff"]
  N212_B["stringField"]
  N212_A --> N212_B
  N213_A["emptyBaselineDiff"]
  N213_B["emptyChangeSet"]
  N213_A --> N213_B
  N214_A["emptyBaselineDiff"]
  N214_B["qualityScore"]
  N214_A --> N214_B
  N215_A["emptyBaselineDiff"]
  N215_B["stringField"]
  N215_A --> N215_B
  N216_A["files"]
  N216_B["arrayField"]
  N216_A --> N216_B
  N217_A["files"]
  N217_B["numberValue"]
  N217_A --> N217_B
  N218_A["files"]
  N218_B["stringValue"]
  N218_A --> N218_B
  N219_A["methods"]
  N219_B["arrayField"]
  N219_A --> N219_B
  N220_A["methods"]
  N220_B["stringValue"]
  N220_A --> N220_B
  N221_A["entrypoints"]
  N221_B["arrayField"]
  N221_A --> N221_B
  N222_A["entrypoints"]
  N222_B["methods"]
  N222_A --> N222_B
  N223_A["entrypoints"]
  N223_B["stringValue"]
  N223_A --> N223_B
  N224_A["resources"]
  N224_B["arrayField"]
  N224_A --> N224_B
  N225_A["businessFlows"]
  N225_B["arrayField"]
  N225_A --> N225_B
  N226_A["businessFlows"]
  N226_B["objectField"]
  N226_A --> N226_B
  N227_A["renderChangeSummary"]
  N227_B["renderEntrypointList"]
  N227_A --> N227_B
  N228_A["renderChangeSummary"]
  N228_B["renderMethodList"]
  N228_A --> N228_B
  N229_A["renderChangeSummary"]
  N229_B["renderStringChange"]
  N229_A --> N229_B
  N230_A["qualityScore"]
  N230_B["numberValue"]
  N230_A --> N230_B
  N231_A["qualityScore"]
  N231_B["objectField"]
  N231_A --> N231_B
  N232_A["stringField"]
  N232_B["stringValue"]
  N232_A --> N232_B
  N233_A["stableStringify"]
  N233_B["stableStringify"]
  N233_A --> N233_B
  N234_A["parseJavaModule"]
  N234_B["buildClassResourceIndex"]
  N234_A --> N234_B
  N235_A["parseJavaModule"]
  N235_B["buildLineIndex"]
  N235_A --> N235_B
  N236_A["parseJavaModule"]
  N236_B["extractClassBlocks"]
  N236_A --> N236_B
  N237_A["parseJavaModule"]
  N237_B["maskJavaSource"]
  N237_A --> N237_B
  N238_A["parseJavaModule"]
  N238_B["stableId"]
  N238_A --> N238_B
  N239_A["extractClassBlocks"]
  N239_B["findMatchingBrace"]
  N239_A --> N239_B
  N240_A["extractClassUnit"]
  N240_B["buildMethodReturnTypeIndex"]
  N240_A --> N240_B
  N241_A["extractClassUnit"]
  N241_B["buildMethodUnit"]
  N241_A --> N241_B
  N242_A["extractClassUnit"]
  N242_B["extractClassResources"]
  N242_A --> N242_B
  N243_A["extractClassUnit"]
  N243_B["extractFieldTypes"]
  N243_A --> N243_B
  N244_A["extractClassUnit"]
  N244_B["extractMethodBlocks"]
  N244_A --> N244_B
  N245_A["extractClassUnit"]
  N245_B["locationFromOffsets"]
  N245_A --> N245_B
  N246_A["extractClassUnit"]
  N246_B["requestMappingPath"]
  N246_A --> N246_B
  N247_A["extractClassUnit"]
  N247_B["stableId"]
  N247_A --> N247_B
  N248_A["extractClassUnit"]
  N248_B["summarizeClass"]
  N248_A --> N248_B
  N249_A["extractClassResources"]
  N249_B["annotationAttribute"]
  N249_A --> N249_B
  N250_A["extractClassResources"]
  N250_B["annotationByName"]
  N250_A --> N250_B
  N251_A["extractClassResources"]
  N251_B["hasAnnotation"]
  N251_A --> N251_B
  N252_A["extractClassResources"]
  N252_B["isRepositoryClass"]
  N252_A --> N252_B
  N253_A["buildClassResourceIndex"]
  N253_B["extractClassResources"]
  N253_A --> N253_B
  N254_A["isRepositoryClass"]
  N254_B["hasAnnotation"]
  N254_A --> N254_B
  N255_A["buildMethodReturnTypeIndex"]
  N255_B["normalizeJavaType"]
  N255_A --> N255_B
  N256_A["extractMethodBlocks"]
  N256_B["findMatchingBrace"]
  N256_A --> N256_B
  N257_A["extractMethodBlocks"]
  N257_B["leadingWhitespaceLength"]
  N257_A --> N257_B
  N258_A["extractMethodBlocks"]
  N258_B["parseMethodHeader"]
  N258_A --> N258_B
  N259_A["parseMethodHeader"]
  N259_B["parseParameters"]
  N259_A --> N259_B
  N260_A["parseMethodHeader"]
  N260_B["stripAnnotations"]
  N260_A --> N260_B
  N261_A["buildMethodUnit"]
  N261_B["buildReceiverTypeIndex"]
  N261_A --> N261_B
  N262_A["buildMethodUnit"]
  N262_B["locationFromOffsets"]
  N262_A --> N262_B
  N263_A["buildMethodUnit"]
  N263_B["stableId"]
  N263_A --> N263_B
  N264_A["extractCalls"]
  N264_B["normalizeReceiverCall"]
  N264_A --> N264_B
  N265_A["buildReceiverTypeIndex"]
  N265_B["extractLocalVariableTypes"]
  N265_A --> N265_B
  N266_A["buildReceiverTypeIndex"]
  N266_B["normalizeJavaType"]
  N266_A --> N266_B
  N267_A["extractResources"]
  N267_B["extractRepositoryOperationResources"]
  N267_A --> N267_B
  N268_A["extractResources"]
  N268_B["extractStringLiterals"]
  N268_A --> N268_B
  N269_A["extractRepositoryOperationResources"]
  N269_B["isPersistenceReceiver"]
  N269_A --> N269_B
  N270_A["extractRepositoryOperationResources"]
  N270_B["relatedResourcesForType"]
  N270_A --> N270_B
  N271_A["extractFrameworkHints"]
  N271_B["annotationAttribute"]
  N271_A --> N271_B
  N272_A["extractFrameworkHints"]
  N272_B["annotationByName"]
  N272_A --> N272_B
  N273_A["extractFrameworkHints"]
  N273_B["firstAnnotationString"]
  N273_A --> N273_B
  N274_A["extractFrameworkHints"]
  N274_B["hasAnnotation"]
  N274_A --> N274_B
  N275_A["extractFrameworkHints"]
  N275_B["isRepositoryClass"]
  N275_A --> N275_B
  N276_A["extractFrameworkHints"]
  N276_B["routeFromAnnotations"]
  N276_A --> N276_B
  N277_A["extractEntrypointHints"]
  N277_B["hasAnnotation"]
  N277_A --> N277_B
  N278_A["routeFromAnnotations"]
  N278_B["annotationAttribute"]
  N278_A --> N278_B
  N279_A["routeFromAnnotations"]
  N279_B["annotationName"]
  N279_A --> N279_B
  N280_A["routeFromAnnotations"]
  N280_B["firstAnnotationString"]
  N280_A --> N280_B
  N281_A["routeFromAnnotations"]
  N281_B["joinRoutePaths"]
  N281_A --> N281_B
  N282_A["routeFromAnnotations"]
  N282_B["requestMappingMethod"]
  N282_A --> N282_B
  N283_A["requestMappingPath"]
  N283_B["annotationAttribute"]
  N283_A --> N283_B
  N284_A["requestMappingPath"]
  N284_B["annotationName"]
  N284_A --> N284_B
  N285_A["requestMappingPath"]
  N285_B["firstAnnotationString"]
  N285_A --> N285_B
  N286_A["parseParameters"]
  N286_B["splitTopLevel"]
  N286_A --> N286_B
  N287_A["parseParameters"]
  N287_B["stripAnnotations"]
  N287_A --> N287_B
  N288_A["extractFieldTypes"]
  N288_B["findMatchingBrace"]
  N288_A --> N288_B
  N289_A["extractFieldTypes"]
  N289_B["parseFieldStatement"]
  N289_A --> N289_B
  N290_A["extractLocalVariableTypes"]
  N290_B["normalizeJavaType"]
  N290_A --> N290_B
  N291_A["extractLocalVariableTypes"]
  N291_B["normalizeReceiverCall"]
  N291_A --> N291_B
  N292_A["parseFieldStatement"]
  N292_B["normalizeJavaType"]
  N292_A --> N292_B
  N293_A["parseFieldStatement"]
  N293_B["splitTopLevel"]
  N293_A --> N293_B
  N294_A["parseFieldStatement"]
  N294_B["stripAnnotations"]
  N294_A --> N294_B
  N295_A["hasAnnotation"]
  N295_B["annotationName"]
  N295_A --> N295_B
  N296_A["annotationByName"]
  N296_B["annotationName"]
  N296_A --> N296_B
  N297_A["locationFromOffsets"]
  N297_B["lineNumberAt"]
  N297_A --> N297_B
  N298_A["parseModules"]
  N298_B["findParserAdapter"]
  N298_A --> N298_B
  N299_A["parseModules"]
  N299_B["stableId"]
  N299_A --> N299_B
  N300_A["parseTypeScriptModule"]
  N300_B["extractFunctionUnit"]
  N300_A --> N300_B
  N301_A["parseTypeScriptModule"]
  N301_B["extractVariableFunctionUnit"]
  N301_A --> N301_B
  N302_A["parseTypeScriptModule"]
  N302_B["stableId"]
  N302_A --> N302_B
  N303_A["parseTypeScriptModule"]
  N303_B["summarizeModule"]
  N303_A --> N303_B
  N304_A["extractClassUnit"]
  N304_B["extractCallableUnit"]
  N304_A --> N304_B
  N305_A["extractClassUnit"]
  N305_B["getLocation"]
  N305_A --> N305_B
  N306_A["extractClassUnit"]
  N306_B["stableId"]
  N306_A --> N306_B
  N307_A["extractFunctionUnit"]
  N307_B["extractCallableUnit"]
  N307_A --> N307_B
  N308_A["extractVariableFunctionUnit"]
  N308_B["extractCallableUnit"]
  N308_A --> N308_B
  N309_A["extractCallableUnit"]
  N309_B["buildSignature"]
  N309_A --> N309_B
  N310_A["extractCallableUnit"]
  N310_B["extractParameters"]
  N310_A --> N310_B
  N311_A["extractCallableUnit"]
  N311_B["getLocation"]
  N311_A --> N311_B
  N312_A["extractCallableUnit"]
  N312_B["hasModifier"]
  N312_A --> N312_B
  N313_A["extractCallableUnit"]
  N313_B["isJavaScriptFile"]
  N313_A --> N313_B
  N314_A["extractCallableUnit"]
  N314_B["stableId"]
  N314_A --> N314_B
  N315_A["extractVisibility"]
  N315_B["hasModifier"]
  N315_A --> N315_B
  N316_A["extractCalls"]
  N316_B["formatCallExpression"]
  N316_A --> N316_B
  N317_A["extractFrameworkHints"]
  N317_B["literalText"]
  N317_A --> N317_B
  N318_A["extractFrameworkHints"]
  N318_B["parseHttpRouteCall"]
  N318_A --> N318_B
  N319_A["extractEntrypointHints"]
  N319_B["parseHttpRouteCall"]
  N319_A --> N319_B
  N320_A["parseHttpRouteCall"]
  N320_B["literalText"]
  N320_A --> N320_B
  N321_A["scanRepo"]
  N321_B["detectLanguage"]
  N321_A --> N321_B
  N322_A["scanRepo"]
  N322_B["matchesAnyExclude"]
  N322_A --> N322_B
  N323_A["scanRepo"]
  N323_B["toPosixPath"]
  N323_A --> N323_B
  N324_A["matchesAnyExclude"]
  N324_B["matchesExclude"]
  N324_A --> N324_B
  N325_A["matchesExclude"]
  N325_B["escapeRegex"]
  N325_A --> N325_B
  N326_A["matchesExclude"]
  N326_B["toPosixPath"]
  N326_A --> N326_B
  N327_A["readJson"]
  N327_B["readJsonAt"]
  N327_A --> N327_B
  N328_A["generateFixtureOutput"]
  N328_B["analyzeRepo"]
  N328_A --> N328_B
  N329_A["generateFixtureOutput"]
  N329_B["generateDocs"]
  N329_A --> N329_B
  N330_A["generateFixtureOutput"]
  N330_B["writeResultJson"]
  N330_A --> N330_B
  N331_A["assertSchema"]
  N331_B["assertSchema"]
  N331_A --> N331_B
  N332_A["assertSchema"]
  N332_B["typeOf"]
  N332_A --> N332_B
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
| runAnalyzeCommand | applyModelNetworkEnv | applyModelNetworkEnv | 1 |
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
| runInteractiveCommand | loadModelConfig | loadModelConfig | 1 |
| runInteractiveCommand | loadProjectConfig | loadProjectConfig | 1 |
| runInteractiveCommand | normalizeProvider | normalizeProvider | 1 |
| runInteractiveCommand | runAnalyzeCommand | runAnalyzeCommand | 1 |
| runInteractiveCommand | runDoctorCommand | runDoctorCommand | 1 |
| runInteractiveCommand | runInitCommand | runInitCommand | 1 |
| askSecret | ask | ask | 1 |
| runModelTestCommand | applyModelNetworkEnv | applyModelNetworkEnv | 1 |
| runModelTestCommand | createChatModel | createChatModel | 3 |
| runModelTestCommand | loadModelConfig | loadModelConfig | 1 |
| runModelTestCommand | loadProjectConfig | loadProjectConfig | 1 |
| runModelTestCommand | previewResponse | previewResponse | 1 |
| runModelTestCommand | saveModelDefaults | saveModelDefaults | 3 |
| runModelTestCommand | shouldSave | shouldSave | 3 |
| previewResponse | isMessageLike | isMessageLike | 1 |
| previewResponse | truncate | truncate | 1 |
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
| main | runModelTestCommand | runModelTestCommand | 1 |
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
| createChatModel | applyModelNetworkEnv | applyModelNetworkEnv | 1 |
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
