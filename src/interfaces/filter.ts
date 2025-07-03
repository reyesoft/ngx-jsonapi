type Value = string | number | boolean | null;
type Values = Value[];


type Operator =
  | "="
  | "<>"
  | ">"
  | ">="
  | "<"
  | "<="
  | "contains"
  | "notcontains"
  | "startswith"
  | "endswith"
  | "any";

type NotCondition = { not: Filter };

type LogicalCondition = { and: Filter[] } | { or: Filter[] };

type Filter = Condition | NotCondition | LogicalCondition;


interface Condition {
  field: string;
  operator: Operator;
  value: Value | Values;
}

function serializeFilter(filter: Filter): string {
  if ("and" in filter) {
    return `and(${filter.and.map(serializeFilter).join(",")})`;
  }

  if ("or" in filter) {
    return `or(${filter.or.map(serializeFilter).join(",")})`;
  }

  if ("not" in filter) {
    return `!${serializeFilter(filter.not)}`;
  }

  const { field, operator, value } = filter;

  // Special function-style operators
  const funcStyle = ["contains", "notcontains", "startswith", "endswith", "any"];
  if (funcStyle.includes(operator)) {
    if (Array.isArray(value)) {
      return `${operator}(${field},${value.map(quoteValue).join(",")})`;
    }
    return `${operator}(${field},${quoteValue(value)})`;
  }

  // Binary operator (e.g. age>=20)
  return `${field}${operator}${quoteValue(value)}`;
}

function quoteValue(val: any): string {
  if (val === null) return "null";
  if (typeof val === "string") return `'${val}'`;
  return val.toString();
}
