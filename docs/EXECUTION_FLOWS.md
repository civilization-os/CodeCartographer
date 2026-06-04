# Execution Flows

执行流由静态调用图推断：入口候选通常没有已解析的内部调用者，并且至少调用了一个仓库内部方法。当前结果代表工程执行路径，不等同于完整运行时链路。

## extractClassUnit

Entry: `src/parser/javaStructureParser.ts:144` extractClassUnit

### Steps

1. extractClassUnit - 从Java源代码中提取类单元，包括方法、字段、资源和路由前缀，并构建ClassUnit对象。
2. buildMethodReturnTypeIndex - 构建方法返回类型索引，将每个方法名称及其带类名前缀的变体映射到唯一的返回类型。
3. buildMethodUnit - 构建一个方法单元对象，包含方法元数据、调用、资源、框架提示和摘要。
4. extractClassResources - 从Java类块中提取实体、表和仓库资源标识符。
5. extractFieldTypes - 从Java类定义中提取字段名和类型，返回映射表。
6. extractMethodBlocks - 从Java类块中提取所有方法块，包括有方法体和抽象方法声明。
7. locationFromOffsets - 根据文件路径、行索引和偏移量范围计算并返回源代码位置信息。
8. requestMappingPath - 从注解列表中提取RequestMapping注解的路径值。
9. stableId - 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。
10. summarizeClass - 生成Java类的中文摘要字符串，包含类名、类型、方法数量和关联资源。

### Resources

- 无

## main

Entry: `src/index.ts:8` main

### Steps

1. main - 解析命令行参数，加载项目配置和模型配置，执行代码仓库分析并生成文档，最后输出结果到控制台和JSON文件。
2. analyzeRepo - 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。
3. generateDocs - 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。
4. loadModelConfig - 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。
5. loadProjectConfig - 从指定根路径异步加载并解析项目配置文件，若文件不存在则返回空配置。
6. parseArgs - 解析命令行参数，提取命令、目标路径和环境变量覆盖值。
7. printHelp - 打印 see-code 工具的使用说明和命令行参数帮助信息。
8. writeResultJson - 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。
9. attachHeuristicSemantics - 遍历模块列表，为每个方法附加启发式语义标签。
10. buildRelationGraph - 构建模块、类、方法和资源之间的关系图，返回节点和边集合。

### Resources

- `FILE:ARCHITECTURE.md`
- `FILE:BUSINESS_FLOWS.md`
- `FILE:CALL_GRAPH.md`
- `FILE:CHANGE_SUMMARY.md`
- `FILE:DATA_AND_RESOURCES.md`
- `FILE:ENTRYPOINTS.md`
- `FILE:EXECUTION_FLOWS.md`
- `FILE:MAINTENANCE_GUIDE.md`
- `FILE:MODULES.md`
- `FILE:PROJECT_OVERVIEW.md`
- `FILE:QUALITY_REPORT.md`
- `FILE:result-diff.json`
- `FILE:result.json`

## parseJavaModule

Entry: `src/parser/javaStructureParser.ts:84` parseJavaModule

### Steps

1. parseJavaModule - 解析Java源文件并提取模块单元信息，包括类、方法和导入。
2. buildClassResourceIndex - 构建类名到资源列表的映射索引。
3. buildLineIndex - 根据源代码文本构建行索引，记录每行起始字符位置。
4. extractClassBlocks - 从Java源代码中提取类、接口、枚举和记录的定义块，包括注解、声明和代码范围。
5. maskJavaSource - 将Java源代码中的注释和字符串字面量替换为空格，返回脱敏后的文本。
6. stableId - 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。
7. extractClassResources - 从Java类块中提取实体、表和仓库资源标识符。
8. findMatchingBrace - 从指定起始位置开始，在字符串中查找与左花括号匹配的右花括号的索引。
9. annotationAttribute - 从注解字符串中提取指定属性的值。
10. annotationByName - 根据名称在注解字符串数组中查找匹配的注解。

### Resources

- 无

## extractFrameworkHints

Entry: `src/parser/javaStructureParser.ts:575` extractFrameworkHints

### Steps

1. extractFrameworkHints - 从Java类和方法中提取框架相关的注解和模式，生成框架提示列表。
2. annotationAttribute - 从注解字符串中提取指定属性的值。
3. annotationByName - 根据名称在注解字符串数组中查找匹配的注解。
4. firstAnnotationString - 从注解字符串中提取第一个双引号内的内容。
5. hasAnnotation - 检查给定的注解列表中是否存在指定名称的注解。
6. routeFromAnnotations - 从注解列表中解析出HTTP方法和路径，结合类路由前缀生成完整路由。
7. annotationName - 从注解字符串中提取注解名称。
8. joinRoutePaths - 拼接路由路径前缀与路径，去除空段和重复斜杠，并确保结果以斜杠开头。
9. requestMappingMethod - 从Spring注解中提取HTTP请求方法并转换为小写，默认返回'all'。

### Resources

- 无

## parseTypeScriptModule

Entry: `src/parser/typescriptStructureParser.ts:15` parseTypeScriptModule

### Steps

1. parseTypeScriptModule - 解析 TypeScript 或 JavaScript 源文件，提取导入、类、函数和变量函数单元，并返回模块单元对象。
2. extractFunctionUnit - 从TypeScript函数声明节点提取方法单元信息。
3. extractVariableFunctionUnit - 从TypeScript源文件中提取变量函数单元，通过调用extractCallableUnit生成MethodUnit。
4. stableId - 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。
5. summarizeModule - 生成一个描述模块路径、类数量、方法数量和导入数量的中文字符串。
6. extractCallableUnit - 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。
7. buildSignature - 根据给定的函数声明节点和名称，生成包含参数列表和返回类型的函数签名字符串。
8. extractParameters - 从TypeScript AST节点中提取函数或方法的参数信息，包括名称、类型、可选性和默认值。
9. getLocation - 根据TypeScript AST节点在源文件中的起始和结束位置计算行号范围，并返回包含文件名和行号区间的SourceLocation对象。
10. hasModifier - 检查 TypeScript AST 节点是否具有指定类型的修饰符。

### Resources

- 无

## extractClassUnit

Entry: `src/parser/typescriptStructureParser.ts:96` extractClassUnit

### Steps

1. extractClassUnit - 从 TypeScript 类声明中提取类单元信息，包括类名、方法列表和位置。
2. extractCallableUnit - 从TypeScript AST节点提取可调用单元的所有元数据并组装为MethodUnit对象。
3. getLocation - 根据TypeScript AST节点在源文件中的起始和结束位置计算行号范围，并返回包含文件名和行号区间的SourceLocation对象。
4. stableId - 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。
5. buildSignature - 根据给定的函数声明节点和名称，生成包含参数列表和返回类型的函数签名字符串。
6. extractParameters - 从TypeScript AST节点中提取函数或方法的参数信息，包括名称、类型、可选性和默认值。
7. hasModifier - 检查 TypeScript AST 节点是否具有指定类型的修饰符。
8. isJavaScriptFile - 判断给定文件名是否具有JavaScript文件扩展名。

### Resources

- 无

## generateFixtureOutput

Entry: `tests/schemaContract.test.ts:88` generateFixtureOutput

### Steps

1. generateFixtureOutput - 在临时目录中复制Java Spring测试夹具，执行仓库分析和文档生成，并将结果写入JSON文件。
2. analyzeRepo - 分析指定代码仓库，提取模块、方法、类、资源及关系图，并返回分析结果。
3. generateDocs - 生成工程文档，将分析结果写入指定目录的多个 Markdown 文件并返回写入路径及摘要信息。
4. writeResultJson - 将结果写入文件系统，包括结果JSON、差异JSON和变更摘要Markdown文件。
5. attachHeuristicSemantics - 遍历模块列表，为每个方法附加启发式语义标签。
6. buildRelationGraph - 构建模块、类、方法和资源之间的关系图，返回节点和边集合。
7. buildScanRuntimeInfo - 构建扫描运行时信息，合并默认排除规则与用户配置，并设置最大文件字节数和配置路径。
8. enrichModulesWithMethodSemantics - 对模块列表中的每个方法进行语义分析，优先使用缓存，未缓存的方法通过LLM或启发式方法分析，并更新模块和类的摘要。
9. loadModelConfig - 从环境变量和项目配置中加载并合并LLM模型配置，返回一个完整的ModelConfig对象。
10. parseModules - 遍历源文件列表，使用适配器解析每个文件并返回模块单元数组，若找不到适配器则生成默认模块单元。

### Resources

- `FILE:ARCHITECTURE.md`
- `FILE:BUSINESS_FLOWS.md`
- `FILE:CALL_GRAPH.md`
- `FILE:CHANGE_SUMMARY.md`
- `FILE:DATA_AND_RESOURCES.md`
- `FILE:ENTRYPOINTS.md`
- `FILE:EXECUTION_FLOWS.md`
- `FILE:MAINTENANCE_GUIDE.md`
- `FILE:MODULES.md`
- `FILE:PROJECT_OVERVIEW.md`
- `FILE:QUALITY_REPORT.md`
- `FILE:result-diff.json`
- `FILE:result.json`

## extractResources

Entry: `src/graph/relationGraphBuilder.ts:117` extractResources

### Steps

1. extractResources - 从模块单元中提取所有资源并去重排序，返回资源节点数组。
2. resourceKind - 根据资源字符串前缀返回对应的资源类型标识。
3. stableId - 将路径片段数组用冒号连接并规范化，生成稳定的标识符字符串。

### Resources

- 无
