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
  N18_A["parseArgs"]
  N18_B["loadModelConfig"]
  N18_A --> N18_B
  N19_A["parseArgs"]
  N19_B["requireValue"]
  N19_A --> N19_B
  N20_A["enrichModulesWithMethodSemantics"]
  N20_B["MethodSemanticCache#open"]
  N20_A --> N20_B
  N21_A["enrichModulesWithMethodSemantics"]
  N21_B["analyzeMethodWithLlm"]
  N21_A --> N21_B
  N22_A["enrichModulesWithMethodSemantics"]
  N22_B["createChatModel"]
  N22_A --> N22_B
  N23_A["enrichModulesWithMethodSemantics"]
  N23_B["formatError"]
  N23_A --> N23_B
  N24_A["enrichModulesWithMethodSemantics"]
  N24_B["heuristicSemantic"]
  N24_A --> N24_B
  N25_A["enrichModulesWithMethodSemantics"]
  N25_B["mapWithConcurrency"]
  N25_A --> N25_B
  N26_A["enrichModulesWithMethodSemantics"]
  N26_B["summarizeModuleFromMethods"]
  N26_A --> N26_B
  N27_A["attachHeuristicSemantics"]
  N27_B["heuristicSemantic"]
  N27_A --> N27_B
  N28_A["analyzeMethodWithLlm"]
  N28_B["buildPrompt"]
  N28_A --> N28_B
  N29_A["analyzeMethodWithLlm"]
  N29_B["parseModelResponse"]
  N29_A --> N29_B
  N30_A["parseModelResponse"]
  N30_B["extractContent"]
  N30_A --> N30_B
  N31_A["parseModelResponse"]
  N31_B["extractJsonObject"]
  N31_A --> N31_B
  N32_A["parseModelResponse"]
  N32_B["normalizeSemantic"]
  N32_A --> N32_B
  N33_A["buildPrompt"]
  N33_B["trimSource"]
  N33_A --> N33_B
  N34_A["cacheKey"]
  N34_B["hash"]
  N34_A --> N34_B
  N35_A["MethodSemanticCache#get"]
  N35_B["cacheKey"]
  N35_A --> N35_B
  N36_A["MethodSemanticCache#set"]
  N36_B["cacheKey"]
  N36_A --> N36_B
  N37_A["MethodSemanticCache#load"]
  N37_B["isMissingFile"]
  N37_A --> N37_B
  N38_A["loadModelConfig"]
  N38_B["defaultBaseUrl"]
  N38_A --> N38_B
  N39_A["loadModelConfig"]
  N39_B["defaultModel"]
  N39_A --> N39_B
  N40_A["loadModelConfig"]
  N40_B["getApiKey"]
  N40_A --> N40_B
  N41_A["loadModelConfig"]
  N41_B["parseInteger"]
  N41_A --> N41_B
  N42_A["loadModelConfig"]
  N42_B["parseNumber"]
  N42_A --> N42_B
  N43_A["loadModelConfig"]
  N43_B["parseOptionalInteger"]
  N43_A --> N43_B
  N44_A["parseJavaModule"]
  N44_B["buildLineIndex"]
  N44_A --> N44_B
  N45_A["parseJavaModule"]
  N45_B["extractClassBlocks"]
  N45_A --> N45_B
  N46_A["parseJavaModule"]
  N46_B["maskJavaSource"]
  N46_A --> N46_B
  N47_A["parseJavaModule"]
  N47_B["stableId"]
  N47_A --> N47_B
  N48_A["extractClassBlocks"]
  N48_B["findMatchingBrace"]
  N48_A --> N48_B
  N49_A["extractClassUnit"]
  N49_B["buildMethodUnit"]
  N49_A --> N49_B
  N50_A["extractClassUnit"]
  N50_B["extractMethodBlocks"]
  N50_A --> N50_B
  N51_A["extractClassUnit"]
  N51_B["locationFromOffsets"]
  N51_A --> N51_B
  N52_A["extractClassUnit"]
  N52_B["requestMappingPath"]
  N52_A --> N52_B
  N53_A["extractClassUnit"]
  N53_B["stableId"]
  N53_A --> N53_B
  N54_A["extractMethodBlocks"]
  N54_B["findMatchingBrace"]
  N54_A --> N54_B
  N55_A["extractMethodBlocks"]
  N55_B["leadingWhitespaceLength"]
  N55_A --> N55_B
  N56_A["extractMethodBlocks"]
  N56_B["parseMethodHeader"]
  N56_A --> N56_B
  N57_A["parseMethodHeader"]
  N57_B["parseParameters"]
  N57_A --> N57_B
  N58_A["parseMethodHeader"]
  N58_B["stripAnnotations"]
  N58_A --> N58_B
  N59_A["buildMethodUnit"]
  N59_B["locationFromOffsets"]
  N59_A --> N59_B
  N60_A["buildMethodUnit"]
  N60_B["stableId"]
  N60_A --> N60_B
  N61_A["extractResources"]
  N61_B["extractStringLiterals"]
  N61_A --> N61_B
  N62_A["extractFrameworkHints"]
  N62_B["annotationAttribute"]
  N62_A --> N62_B
  N63_A["extractFrameworkHints"]
  N63_B["annotationByName"]
  N63_A --> N63_B
  N64_A["extractFrameworkHints"]
  N64_B["firstAnnotationString"]
  N64_A --> N64_B
  N65_A["extractFrameworkHints"]
  N65_B["hasAnnotation"]
  N65_A --> N65_B
  N66_A["extractFrameworkHints"]
  N66_B["routeFromAnnotations"]
  N66_A --> N66_B
  N67_A["extractEntrypointHints"]
  N67_B["hasAnnotation"]
  N67_A --> N67_B
  N68_A["routeFromAnnotations"]
  N68_B["annotationAttribute"]
  N68_A --> N68_B
  N69_A["routeFromAnnotations"]
  N69_B["annotationName"]
  N69_A --> N69_B
  N70_A["routeFromAnnotations"]
  N70_B["firstAnnotationString"]
  N70_A --> N70_B
  N71_A["routeFromAnnotations"]
  N71_B["joinRoutePaths"]
  N71_A --> N71_B
  N72_A["routeFromAnnotations"]
  N72_B["requestMappingMethod"]
  N72_A --> N72_B
  N73_A["requestMappingPath"]
  N73_B["annotationAttribute"]
  N73_A --> N73_B
  N74_A["requestMappingPath"]
  N74_B["annotationName"]
  N74_A --> N74_B
  N75_A["requestMappingPath"]
  N75_B["firstAnnotationString"]
  N75_A --> N75_B
  N76_A["parseParameters"]
  N76_B["splitTopLevel"]
  N76_A --> N76_B
  N77_A["parseParameters"]
  N77_B["stripAnnotations"]
  N77_A --> N77_B
  N78_A["hasAnnotation"]
  N78_B["annotationName"]
  N78_A --> N78_B
  N79_A["annotationByName"]
  N79_B["annotationName"]
  N79_A --> N79_B
  N80_A["locationFromOffsets"]
  N80_B["lineNumberAt"]
  N80_A --> N80_B
  N81_A["parseModules"]
  N81_B["findParserAdapter"]
  N81_A --> N81_B
  N82_A["parseModules"]
  N82_B["stableId"]
  N82_A --> N82_B
  N83_A["parseTypeScriptModule"]
  N83_B["extractFunctionUnit"]
  N83_A --> N83_B
  N84_A["parseTypeScriptModule"]
  N84_B["extractVariableFunctionUnit"]
  N84_A --> N84_B
  N85_A["parseTypeScriptModule"]
  N85_B["stableId"]
  N85_A --> N85_B
  N86_A["parseTypeScriptModule"]
  N86_B["summarizeModule"]
  N86_A --> N86_B
  N87_A["extractClassUnit"]
  N87_B["extractCallableUnit"]
  N87_A --> N87_B
  N88_A["extractClassUnit"]
  N88_B["getLocation"]
  N88_A --> N88_B
  N89_A["extractClassUnit"]
  N89_B["stableId"]
  N89_A --> N89_B
  N90_A["extractFunctionUnit"]
  N90_B["extractCallableUnit"]
  N90_A --> N90_B
  N91_A["extractVariableFunctionUnit"]
  N91_B["extractCallableUnit"]
  N91_A --> N91_B
  N92_A["extractCallableUnit"]
  N92_B["buildSignature"]
  N92_A --> N92_B
  N93_A["extractCallableUnit"]
  N93_B["extractParameters"]
  N93_A --> N93_B
  N94_A["extractCallableUnit"]
  N94_B["getLocation"]
  N94_A --> N94_B
  N95_A["extractCallableUnit"]
  N95_B["hasModifier"]
  N95_A --> N95_B
  N96_A["extractCallableUnit"]
  N96_B["isJavaScriptFile"]
  N96_A --> N96_B
  N97_A["extractCallableUnit"]
  N97_B["stableId"]
  N97_A --> N97_B
  N98_A["extractVisibility"]
  N98_B["hasModifier"]
  N98_A --> N98_B
  N99_A["extractCalls"]
  N99_B["formatCallExpression"]
  N99_A --> N99_B
  N100_A["extractFrameworkHints"]
  N100_B["literalText"]
  N100_A --> N100_B
  N101_A["extractFrameworkHints"]
  N101_B["parseHttpRouteCall"]
  N101_A --> N101_B
  N102_A["extractEntrypointHints"]
  N102_B["parseHttpRouteCall"]
  N102_A --> N102_B
  N103_A["parseHttpRouteCall"]
  N103_B["literalText"]
  N103_A --> N103_B
  N104_A["scanRepo"]
  N104_B["detectLanguage"]
  N104_A --> N104_B
  N105_A["scanRepo"]
  N105_B["toPosixPath"]
  N105_A --> N105_B
  N106_A["createOrder"]
  N106_B["normalizeOrder"]
  N106_A --> N106_B
  N107_A["createOrder"]
  N107_B["persistOrder"]
  N107_A --> N107_B
  N108_A["main"]
  N108_B["registerRoutes"]
  N108_A --> N108_B
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
