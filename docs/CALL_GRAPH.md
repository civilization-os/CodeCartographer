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
  N3_B["enrichModulesWithMethodSemantics"]
  N3_A --> N3_B
  N4_A["analyzeRepo"]
  N4_B["loadModelConfig"]
  N4_A --> N4_B
  N5_A["analyzeRepo"]
  N5_B["parseModules"]
  N5_A --> N5_B
  N6_A["analyzeRepo"]
  N6_B["scanRepo"]
  N6_A --> N6_B
  N7_A["analyzeRepo"]
  N7_B["toModelRuntimeInfo"]
  N7_A --> N7_B
  N8_A["buildRelationGraph"]
  N8_B["buildMethodNameIndex"]
  N8_A --> N8_B
  N9_A["buildRelationGraph"]
  N9_B["dedupeEdges"]
  N9_A --> N9_B
  N10_A["buildRelationGraph"]
  N10_B["resolveCallTarget"]
  N10_A --> N10_B
  N11_A["buildRelationGraph"]
  N11_B["scoreCall"]
  N11_A --> N11_B
  N12_A["buildRelationGraph"]
  N12_B["stableId"]
  N12_A --> N12_B
  N13_A["extractResources"]
  N13_B["resourceKind"]
  N13_A --> N13_B
  N14_A["extractResources"]
  N14_B["stableId"]
  N14_A --> N14_B
  N15_A["main"]
  N15_B["analyzeRepo"]
  N15_A --> N15_B
  N16_A["main"]
  N16_B["parseArgs"]
  N16_A --> N16_B
  N17_A["main"]
  N17_B["printHelp"]
  N17_A --> N17_B
  N18_A["main"]
  N18_B["writeResultJson"]
  N18_A --> N18_B
  N19_A["parseArgs"]
  N19_B["loadModelConfig"]
  N19_A --> N19_B
  N20_A["parseArgs"]
  N20_B["requireValue"]
  N20_A --> N20_B
  N21_A["enrichModulesWithMethodSemantics"]
  N21_B["MethodSemanticCache#open"]
  N21_A --> N21_B
  N22_A["enrichModulesWithMethodSemantics"]
  N22_B["analyzeMethodWithLlm"]
  N22_A --> N22_B
  N23_A["enrichModulesWithMethodSemantics"]
  N23_B["createChatModel"]
  N23_A --> N23_B
  N24_A["enrichModulesWithMethodSemantics"]
  N24_B["formatError"]
  N24_A --> N24_B
  N25_A["enrichModulesWithMethodSemantics"]
  N25_B["heuristicSemantic"]
  N25_A --> N25_B
  N26_A["enrichModulesWithMethodSemantics"]
  N26_B["mapWithConcurrency"]
  N26_A --> N26_B
  N27_A["enrichModulesWithMethodSemantics"]
  N27_B["summarizeModuleFromMethods"]
  N27_A --> N27_B
  N28_A["attachHeuristicSemantics"]
  N28_B["heuristicSemantic"]
  N28_A --> N28_B
  N29_A["analyzeMethodWithLlm"]
  N29_B["buildPrompt"]
  N29_A --> N29_B
  N30_A["analyzeMethodWithLlm"]
  N30_B["parseModelResponse"]
  N30_A --> N30_B
  N31_A["parseModelResponse"]
  N31_B["extractContent"]
  N31_A --> N31_B
  N32_A["parseModelResponse"]
  N32_B["extractJsonObject"]
  N32_A --> N32_B
  N33_A["parseModelResponse"]
  N33_B["normalizeSemantic"]
  N33_A --> N33_B
  N34_A["buildPrompt"]
  N34_B["trimSource"]
  N34_A --> N34_B
  N35_A["cacheKey"]
  N35_B["hash"]
  N35_A --> N35_B
  N36_A["MethodSemanticCache#get"]
  N36_B["cacheKey"]
  N36_A --> N36_B
  N37_A["MethodSemanticCache#set"]
  N37_B["cacheKey"]
  N37_A --> N37_B
  N38_A["MethodSemanticCache#load"]
  N38_B["isMissingFile"]
  N38_A --> N38_B
  N39_A["loadModelConfig"]
  N39_B["defaultBaseUrl"]
  N39_A --> N39_B
  N40_A["loadModelConfig"]
  N40_B["defaultModel"]
  N40_A --> N40_B
  N41_A["loadModelConfig"]
  N41_B["getApiKey"]
  N41_A --> N41_B
  N42_A["loadModelConfig"]
  N42_B["parseInteger"]
  N42_A --> N42_B
  N43_A["loadModelConfig"]
  N43_B["parseNumber"]
  N43_A --> N43_B
  N44_A["loadModelConfig"]
  N44_B["parseOptionalInteger"]
  N44_A --> N44_B
  N45_A["writeResultJson"]
  N45_B["buildResultDiff"]
  N45_A --> N45_B
  N46_A["writeResultJson"]
  N46_B["readJson"]
  N46_A --> N46_B
  N47_A["writeResultJson"]
  N47_B["renderChangeSummary"]
  N47_A --> N47_B
  N48_A["writeResultJson"]
  N48_B["toResultJson"]
  N48_A --> N48_B
  N49_A["toResultJson"]
  N49_B["toPosixPath"]
  N49_A --> N49_B
  N50_A["serializeEntrypoint"]
  N50_B["methodRef"]
  N50_A --> N50_B
  N51_A["serializeFlow"]
  N51_B["methodRef"]
  N51_A --> N51_B
  N52_A["serializeBusinessFlow"]
  N52_B["methodRef"]
  N52_A --> N52_B
  N53_A["readJson"]
  N53_B["isNodeError"]
  N53_A --> N53_B
  N54_A["buildResultDiff"]
  N54_B["businessFlows"]
  N54_A --> N54_B
  N55_A["buildResultDiff"]
  N55_B["diffByKey"]
  N55_A --> N55_B
  N56_A["buildResultDiff"]
  N56_B["emptyBaselineDiff"]
  N56_A --> N56_B
  N57_A["buildResultDiff"]
  N57_B["entrypoints"]
  N57_A --> N57_B
  N58_A["buildResultDiff"]
  N58_B["files"]
  N58_A --> N58_B
  N59_A["buildResultDiff"]
  N59_B["methods"]
  N59_A --> N59_B
  N60_A["buildResultDiff"]
  N60_B["qualityScore"]
  N60_A --> N60_B
  N61_A["buildResultDiff"]
  N61_B["resources"]
  N61_A --> N61_B
  N62_A["buildResultDiff"]
  N62_B["stableStringify"]
  N62_A --> N62_B
  N63_A["buildResultDiff"]
  N63_B["stringField"]
  N63_A --> N63_B
  N64_A["emptyBaselineDiff"]
  N64_B["emptyChangeSet"]
  N64_A --> N64_B
  N65_A["emptyBaselineDiff"]
  N65_B["qualityScore"]
  N65_A --> N65_B
  N66_A["emptyBaselineDiff"]
  N66_B["stringField"]
  N66_A --> N66_B
  N67_A["files"]
  N67_B["arrayField"]
  N67_A --> N67_B
  N68_A["files"]
  N68_B["numberValue"]
  N68_A --> N68_B
  N69_A["files"]
  N69_B["objectRecord"]
  N69_A --> N69_B
  N70_A["files"]
  N70_B["stringValue"]
  N70_A --> N70_B
  N71_A["methods"]
  N71_B["arrayField"]
  N71_A --> N71_B
  N72_A["methods"]
  N72_B["objectRecord"]
  N72_A --> N72_B
  N73_A["methods"]
  N73_B["stringValue"]
  N73_A --> N73_B
  N74_A["entrypoints"]
  N74_B["arrayField"]
  N74_A --> N74_B
  N75_A["entrypoints"]
  N75_B["methods"]
  N75_A --> N75_B
  N76_A["entrypoints"]
  N76_B["objectRecord"]
  N76_A --> N76_B
  N77_A["entrypoints"]
  N77_B["stringValue"]
  N77_A --> N77_B
  N78_A["resources"]
  N78_B["arrayField"]
  N78_A --> N78_B
  N79_A["resources"]
  N79_B["objectRecord"]
  N79_A --> N79_B
  N80_A["businessFlows"]
  N80_B["arrayField"]
  N80_A --> N80_B
  N81_A["businessFlows"]
  N81_B["objectField"]
  N81_A --> N81_B
  N82_A["businessFlows"]
  N82_B["objectRecord"]
  N82_A --> N82_B
  N83_A["renderChangeSummary"]
  N83_B["renderEntrypointList"]
  N83_A --> N83_B
  N84_A["renderChangeSummary"]
  N84_B["renderMethodList"]
  N84_A --> N84_B
  N85_A["renderChangeSummary"]
  N85_B["renderStringChange"]
  N85_A --> N85_B
  N86_A["qualityScore"]
  N86_B["numberValue"]
  N86_A --> N86_B
  N87_A["qualityScore"]
  N87_B["objectField"]
  N87_A --> N87_B
  N88_A["stringField"]
  N88_B["stringValue"]
  N88_A --> N88_B
  N89_A["objectField"]
  N89_B["objectRecord"]
  N89_A --> N89_B
  N90_A["stableStringify"]
  N90_B["stableStringify"]
  N90_A --> N90_B
  N91_A["parseJavaModule"]
  N91_B["buildLineIndex"]
  N91_A --> N91_B
  N92_A["parseJavaModule"]
  N92_B["extractClassBlocks"]
  N92_A --> N92_B
  N93_A["parseJavaModule"]
  N93_B["maskJavaSource"]
  N93_A --> N93_B
  N94_A["parseJavaModule"]
  N94_B["stableId"]
  N94_A --> N94_B
  N95_A["extractClassBlocks"]
  N95_B["findMatchingBrace"]
  N95_A --> N95_B
  N96_A["extractClassUnit"]
  N96_B["buildMethodUnit"]
  N96_A --> N96_B
  N97_A["extractClassUnit"]
  N97_B["extractMethodBlocks"]
  N97_A --> N97_B
  N98_A["extractClassUnit"]
  N98_B["locationFromOffsets"]
  N98_A --> N98_B
  N99_A["extractClassUnit"]
  N99_B["requestMappingPath"]
  N99_A --> N99_B
  N100_A["extractClassUnit"]
  N100_B["stableId"]
  N100_A --> N100_B
  N101_A["extractMethodBlocks"]
  N101_B["findMatchingBrace"]
  N101_A --> N101_B
  N102_A["extractMethodBlocks"]
  N102_B["leadingWhitespaceLength"]
  N102_A --> N102_B
  N103_A["extractMethodBlocks"]
  N103_B["parseMethodHeader"]
  N103_A --> N103_B
  N104_A["parseMethodHeader"]
  N104_B["parseParameters"]
  N104_A --> N104_B
  N105_A["parseMethodHeader"]
  N105_B["stripAnnotations"]
  N105_A --> N105_B
  N106_A["buildMethodUnit"]
  N106_B["locationFromOffsets"]
  N106_A --> N106_B
  N107_A["buildMethodUnit"]
  N107_B["stableId"]
  N107_A --> N107_B
  N108_A["extractResources"]
  N108_B["extractStringLiterals"]
  N108_A --> N108_B
  N109_A["extractFrameworkHints"]
  N109_B["annotationAttribute"]
  N109_A --> N109_B
  N110_A["extractFrameworkHints"]
  N110_B["annotationByName"]
  N110_A --> N110_B
  N111_A["extractFrameworkHints"]
  N111_B["firstAnnotationString"]
  N111_A --> N111_B
  N112_A["extractFrameworkHints"]
  N112_B["hasAnnotation"]
  N112_A --> N112_B
  N113_A["extractFrameworkHints"]
  N113_B["routeFromAnnotations"]
  N113_A --> N113_B
  N114_A["extractEntrypointHints"]
  N114_B["hasAnnotation"]
  N114_A --> N114_B
  N115_A["routeFromAnnotations"]
  N115_B["annotationAttribute"]
  N115_A --> N115_B
  N116_A["routeFromAnnotations"]
  N116_B["annotationName"]
  N116_A --> N116_B
  N117_A["routeFromAnnotations"]
  N117_B["firstAnnotationString"]
  N117_A --> N117_B
  N118_A["routeFromAnnotations"]
  N118_B["joinRoutePaths"]
  N118_A --> N118_B
  N119_A["routeFromAnnotations"]
  N119_B["requestMappingMethod"]
  N119_A --> N119_B
  N120_A["requestMappingPath"]
  N120_B["annotationAttribute"]
  N120_A --> N120_B
  N121_A["requestMappingPath"]
  N121_B["annotationName"]
  N121_A --> N121_B
  N122_A["requestMappingPath"]
  N122_B["firstAnnotationString"]
  N122_A --> N122_B
  N123_A["parseParameters"]
  N123_B["splitTopLevel"]
  N123_A --> N123_B
  N124_A["parseParameters"]
  N124_B["stripAnnotations"]
  N124_A --> N124_B
  N125_A["hasAnnotation"]
  N125_B["annotationName"]
  N125_A --> N125_B
  N126_A["annotationByName"]
  N126_B["annotationName"]
  N126_A --> N126_B
  N127_A["locationFromOffsets"]
  N127_B["lineNumberAt"]
  N127_A --> N127_B
  N128_A["parseModules"]
  N128_B["findParserAdapter"]
  N128_A --> N128_B
  N129_A["parseModules"]
  N129_B["stableId"]
  N129_A --> N129_B
  N130_A["parseTypeScriptModule"]
  N130_B["extractFunctionUnit"]
  N130_A --> N130_B
  N131_A["parseTypeScriptModule"]
  N131_B["extractVariableFunctionUnit"]
  N131_A --> N131_B
  N132_A["parseTypeScriptModule"]
  N132_B["stableId"]
  N132_A --> N132_B
  N133_A["parseTypeScriptModule"]
  N133_B["summarizeModule"]
  N133_A --> N133_B
  N134_A["extractClassUnit"]
  N134_B["extractCallableUnit"]
  N134_A --> N134_B
  N135_A["extractClassUnit"]
  N135_B["getLocation"]
  N135_A --> N135_B
  N136_A["extractClassUnit"]
  N136_B["stableId"]
  N136_A --> N136_B
  N137_A["extractFunctionUnit"]
  N137_B["extractCallableUnit"]
  N137_A --> N137_B
  N138_A["extractVariableFunctionUnit"]
  N138_B["extractCallableUnit"]
  N138_A --> N138_B
  N139_A["extractCallableUnit"]
  N139_B["buildSignature"]
  N139_A --> N139_B
  N140_A["extractCallableUnit"]
  N140_B["extractParameters"]
  N140_A --> N140_B
  N141_A["extractCallableUnit"]
  N141_B["getLocation"]
  N141_A --> N141_B
  N142_A["extractCallableUnit"]
  N142_B["hasModifier"]
  N142_A --> N142_B
  N143_A["extractCallableUnit"]
  N143_B["isJavaScriptFile"]
  N143_A --> N143_B
  N144_A["extractCallableUnit"]
  N144_B["stableId"]
  N144_A --> N144_B
  N145_A["extractVisibility"]
  N145_B["hasModifier"]
  N145_A --> N145_B
  N146_A["extractCalls"]
  N146_B["formatCallExpression"]
  N146_A --> N146_B
  N147_A["extractFrameworkHints"]
  N147_B["literalText"]
  N147_A --> N147_B
  N148_A["extractFrameworkHints"]
  N148_B["parseHttpRouteCall"]
  N148_A --> N148_B
  N149_A["extractEntrypointHints"]
  N149_B["parseHttpRouteCall"]
  N149_A --> N149_B
  N150_A["parseHttpRouteCall"]
  N150_B["literalText"]
  N150_A --> N150_B
  N151_A["scanRepo"]
  N151_B["detectLanguage"]
  N151_A --> N151_B
  N152_A["scanRepo"]
  N152_B["toPosixPath"]
  N152_A --> N152_B
  N153_A["createOrder"]
  N153_B["normalizeOrder"]
  N153_A --> N153_B
  N154_A["createOrder"]
  N154_B["persistOrder"]
  N154_A --> N154_B
  N155_A["main"]
  N155_B["registerRoutes"]
  N155_A --> N155_B
```

## Edges

| From | To | Call | Weight |
| --- | --- | --- | --- |
| scan | scan | scan | 1 |
| analyzeRepo | attachHeuristicSemantics | attachHeuristicSemantics | 1 |
| analyzeRepo | buildRelationGraph | buildRelationGraph | 1 |
| analyzeRepo | enrichModulesWithMethodSemantics | enrichModulesWithMethodSemantics | 1 |
| analyzeRepo | loadModelConfig | loadModelConfig | 1 |
| analyzeRepo | parseModules | parseModules | 1 |
| analyzeRepo | scanRepo | scanRepo | 1 |
| analyzeRepo | toModelRuntimeInfo | toModelRuntimeInfo | 1 |
| buildRelationGraph | buildMethodNameIndex | buildMethodNameIndex | 1 |
| buildRelationGraph | dedupeEdges | dedupeEdges | 1 |
| buildRelationGraph | resolveCallTarget | resolveCallTarget | 1 |
| buildRelationGraph | scoreCall | scoreCall | 1 |
| buildRelationGraph | stableId | stableId | 1 |
| extractResources | resourceKind | resourceKind | 1 |
| extractResources | stableId | stableId | 1 |
| main | analyzeRepo | analyzeRepo | 1 |
| main | parseArgs | parseArgs | 1 |
| main | printHelp | printHelp | 1 |
| main | writeResultJson | writeResultJson | 3 |
| parseArgs | loadModelConfig | loadModelConfig | 1 |
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
| parseModelResponse | extractContent | extractContent | 1 |
| parseModelResponse | extractJsonObject | extractJsonObject | 1 |
| parseModelResponse | normalizeSemantic | normalizeSemantic | 1 |
| buildPrompt | trimSource | trimSource | 1 |
| cacheKey | hash | hash | 1 |
| MethodSemanticCache#get | cacheKey | cacheKey | 1 |
| MethodSemanticCache#set | cacheKey | cacheKey | 1 |
| MethodSemanticCache#load | isMissingFile | isMissingFile | 1 |
| loadModelConfig | defaultBaseUrl | defaultBaseUrl | 1 |
| loadModelConfig | defaultModel | defaultModel | 1 |
| loadModelConfig | getApiKey | getApiKey | 1 |
| loadModelConfig | parseInteger | parseInteger | 1 |
| loadModelConfig | parseNumber | parseNumber | 1 |
| loadModelConfig | parseOptionalInteger | parseOptionalInteger | 1 |
| writeResultJson | buildResultDiff | buildResultDiff | 1 |
| writeResultJson | readJson | readJson | 1 |
| writeResultJson | renderChangeSummary | renderChangeSummary | 1 |
| writeResultJson | toResultJson | toResultJson | 1 |
| toResultJson | toPosixPath | toPosixPath | 1 |
| serializeEntrypoint | methodRef | methodRef | 1 |
| serializeFlow | methodRef | methodRef | 1 |
| serializeBusinessFlow | methodRef | methodRef | 1 |
| readJson | isNodeError | isNodeError | 1 |
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
| files | objectRecord | objectRecord | 1 |
| files | stringValue | stringValue | 1 |
| methods | arrayField | arrayField | 1 |
| methods | objectRecord | objectRecord | 1 |
| methods | stringValue | stringValue | 1 |
| entrypoints | arrayField | arrayField | 1 |
| entrypoints | methods | methods | 1 |
| entrypoints | objectRecord | objectRecord | 1 |
| entrypoints | stringValue | stringValue | 1 |
| resources | arrayField | arrayField | 1 |
| resources | objectRecord | objectRecord | 1 |
| businessFlows | arrayField | arrayField | 1 |
| businessFlows | objectField | objectField | 1 |
| businessFlows | objectRecord | objectRecord | 1 |
| renderChangeSummary | renderEntrypointList | renderEntrypointList | 1 |
| renderChangeSummary | renderMethodList | renderMethodList | 1 |
| renderChangeSummary | renderStringChange | renderStringChange | 1 |
| qualityScore | numberValue | numberValue | 1 |
| qualityScore | objectField | objectField | 1 |
| stringField | stringValue | stringValue | 1 |
| objectField | objectRecord | objectRecord | 1 |
| stableStringify | stableStringify | stableStringify | 1 |
| parseJavaModule | buildLineIndex | buildLineIndex | 1 |
| parseJavaModule | extractClassBlocks | extractClassBlocks | 1 |
| parseJavaModule | maskJavaSource | maskJavaSource | 1 |
| parseJavaModule | stableId | stableId | 1 |
| extractClassBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractClassUnit | buildMethodUnit | buildMethodUnit | 1 |
| extractClassUnit | extractMethodBlocks | extractMethodBlocks | 1 |
| extractClassUnit | locationFromOffsets | locationFromOffsets | 1 |
| extractClassUnit | requestMappingPath | requestMappingPath | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractMethodBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractMethodBlocks | leadingWhitespaceLength | leadingWhitespaceLength | 1 |
| extractMethodBlocks | parseMethodHeader | parseMethodHeader | 1 |
| parseMethodHeader | parseParameters | parseParameters | 1 |
| parseMethodHeader | stripAnnotations | stripAnnotations | 1 |
| buildMethodUnit | locationFromOffsets | locationFromOffsets | 1 |
| buildMethodUnit | stableId | stableId | 1 |
| extractResources | extractStringLiterals | extractStringLiterals | 1 |
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
| scanRepo | toPosixPath | toPosixPath | 1 |
| createOrder | normalizeOrder | normalizeOrder | 1 |
| createOrder | persistOrder | persistOrder | 1 |
| main | registerRoutes | registerRoutes | 1 |
