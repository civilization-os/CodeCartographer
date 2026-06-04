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
  N45_B["toResultJson"]
  N45_A --> N45_B
  N46_A["toResultJson"]
  N46_B["toPosixPath"]
  N46_A --> N46_B
  N47_A["serializeEntrypoint"]
  N47_B["methodRef"]
  N47_A --> N47_B
  N48_A["serializeFlow"]
  N48_B["methodRef"]
  N48_A --> N48_B
  N49_A["serializeBusinessFlow"]
  N49_B["methodRef"]
  N49_A --> N49_B
  N50_A["parseJavaModule"]
  N50_B["buildLineIndex"]
  N50_A --> N50_B
  N51_A["parseJavaModule"]
  N51_B["extractClassBlocks"]
  N51_A --> N51_B
  N52_A["parseJavaModule"]
  N52_B["maskJavaSource"]
  N52_A --> N52_B
  N53_A["parseJavaModule"]
  N53_B["stableId"]
  N53_A --> N53_B
  N54_A["extractClassBlocks"]
  N54_B["findMatchingBrace"]
  N54_A --> N54_B
  N55_A["extractClassUnit"]
  N55_B["buildMethodUnit"]
  N55_A --> N55_B
  N56_A["extractClassUnit"]
  N56_B["extractMethodBlocks"]
  N56_A --> N56_B
  N57_A["extractClassUnit"]
  N57_B["locationFromOffsets"]
  N57_A --> N57_B
  N58_A["extractClassUnit"]
  N58_B["requestMappingPath"]
  N58_A --> N58_B
  N59_A["extractClassUnit"]
  N59_B["stableId"]
  N59_A --> N59_B
  N60_A["extractMethodBlocks"]
  N60_B["findMatchingBrace"]
  N60_A --> N60_B
  N61_A["extractMethodBlocks"]
  N61_B["leadingWhitespaceLength"]
  N61_A --> N61_B
  N62_A["extractMethodBlocks"]
  N62_B["parseMethodHeader"]
  N62_A --> N62_B
  N63_A["parseMethodHeader"]
  N63_B["parseParameters"]
  N63_A --> N63_B
  N64_A["parseMethodHeader"]
  N64_B["stripAnnotations"]
  N64_A --> N64_B
  N65_A["buildMethodUnit"]
  N65_B["locationFromOffsets"]
  N65_A --> N65_B
  N66_A["buildMethodUnit"]
  N66_B["stableId"]
  N66_A --> N66_B
  N67_A["extractResources"]
  N67_B["extractStringLiterals"]
  N67_A --> N67_B
  N68_A["extractFrameworkHints"]
  N68_B["annotationAttribute"]
  N68_A --> N68_B
  N69_A["extractFrameworkHints"]
  N69_B["annotationByName"]
  N69_A --> N69_B
  N70_A["extractFrameworkHints"]
  N70_B["firstAnnotationString"]
  N70_A --> N70_B
  N71_A["extractFrameworkHints"]
  N71_B["hasAnnotation"]
  N71_A --> N71_B
  N72_A["extractFrameworkHints"]
  N72_B["routeFromAnnotations"]
  N72_A --> N72_B
  N73_A["extractEntrypointHints"]
  N73_B["hasAnnotation"]
  N73_A --> N73_B
  N74_A["routeFromAnnotations"]
  N74_B["annotationAttribute"]
  N74_A --> N74_B
  N75_A["routeFromAnnotations"]
  N75_B["annotationName"]
  N75_A --> N75_B
  N76_A["routeFromAnnotations"]
  N76_B["firstAnnotationString"]
  N76_A --> N76_B
  N77_A["routeFromAnnotations"]
  N77_B["joinRoutePaths"]
  N77_A --> N77_B
  N78_A["routeFromAnnotations"]
  N78_B["requestMappingMethod"]
  N78_A --> N78_B
  N79_A["requestMappingPath"]
  N79_B["annotationAttribute"]
  N79_A --> N79_B
  N80_A["requestMappingPath"]
  N80_B["annotationName"]
  N80_A --> N80_B
  N81_A["requestMappingPath"]
  N81_B["firstAnnotationString"]
  N81_A --> N81_B
  N82_A["parseParameters"]
  N82_B["splitTopLevel"]
  N82_A --> N82_B
  N83_A["parseParameters"]
  N83_B["stripAnnotations"]
  N83_A --> N83_B
  N84_A["hasAnnotation"]
  N84_B["annotationName"]
  N84_A --> N84_B
  N85_A["annotationByName"]
  N85_B["annotationName"]
  N85_A --> N85_B
  N86_A["locationFromOffsets"]
  N86_B["lineNumberAt"]
  N86_A --> N86_B
  N87_A["parseModules"]
  N87_B["findParserAdapter"]
  N87_A --> N87_B
  N88_A["parseModules"]
  N88_B["stableId"]
  N88_A --> N88_B
  N89_A["parseTypeScriptModule"]
  N89_B["extractFunctionUnit"]
  N89_A --> N89_B
  N90_A["parseTypeScriptModule"]
  N90_B["extractVariableFunctionUnit"]
  N90_A --> N90_B
  N91_A["parseTypeScriptModule"]
  N91_B["stableId"]
  N91_A --> N91_B
  N92_A["parseTypeScriptModule"]
  N92_B["summarizeModule"]
  N92_A --> N92_B
  N93_A["extractClassUnit"]
  N93_B["extractCallableUnit"]
  N93_A --> N93_B
  N94_A["extractClassUnit"]
  N94_B["getLocation"]
  N94_A --> N94_B
  N95_A["extractClassUnit"]
  N95_B["stableId"]
  N95_A --> N95_B
  N96_A["extractFunctionUnit"]
  N96_B["extractCallableUnit"]
  N96_A --> N96_B
  N97_A["extractVariableFunctionUnit"]
  N97_B["extractCallableUnit"]
  N97_A --> N97_B
  N98_A["extractCallableUnit"]
  N98_B["buildSignature"]
  N98_A --> N98_B
  N99_A["extractCallableUnit"]
  N99_B["extractParameters"]
  N99_A --> N99_B
  N100_A["extractCallableUnit"]
  N100_B["getLocation"]
  N100_A --> N100_B
  N101_A["extractCallableUnit"]
  N101_B["hasModifier"]
  N101_A --> N101_B
  N102_A["extractCallableUnit"]
  N102_B["isJavaScriptFile"]
  N102_A --> N102_B
  N103_A["extractCallableUnit"]
  N103_B["stableId"]
  N103_A --> N103_B
  N104_A["extractVisibility"]
  N104_B["hasModifier"]
  N104_A --> N104_B
  N105_A["extractCalls"]
  N105_B["formatCallExpression"]
  N105_A --> N105_B
  N106_A["extractFrameworkHints"]
  N106_B["literalText"]
  N106_A --> N106_B
  N107_A["extractFrameworkHints"]
  N107_B["parseHttpRouteCall"]
  N107_A --> N107_B
  N108_A["extractEntrypointHints"]
  N108_B["parseHttpRouteCall"]
  N108_A --> N108_B
  N109_A["parseHttpRouteCall"]
  N109_B["literalText"]
  N109_A --> N109_B
  N110_A["scanRepo"]
  N110_B["detectLanguage"]
  N110_A --> N110_B
  N111_A["scanRepo"]
  N111_B["toPosixPath"]
  N111_A --> N111_B
  N112_A["createOrder"]
  N112_B["normalizeOrder"]
  N112_A --> N112_B
  N113_A["createOrder"]
  N113_B["persistOrder"]
  N113_A --> N113_B
  N114_A["main"]
  N114_B["registerRoutes"]
  N114_A --> N114_B
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
| writeResultJson | toResultJson | toResultJson | 1 |
| toResultJson | toPosixPath | toPosixPath | 1 |
| serializeEntrypoint | methodRef | methodRef | 1 |
| serializeFlow | methodRef | methodRef | 1 |
| serializeBusinessFlow | methodRef | methodRef | 1 |
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
