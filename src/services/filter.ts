export class FilterSerializer {
  static serialize(filter: Filter): string {
    if ("and" in filter) {
      return `and(${filter.and.map(FilterSerializer.serialize).join(",")})`;
    }

    if ("or" in filter) {
      return `or(${filter.or.map(FilterSerializer.serialize).join(",")})`;
    }

    if ("not" in filter) {
      return `not(${FilterSerializer.serialize(filter.not)})`;
    }

    const { field, operator, value } = filter;

    const funcStyle: Operator[] = [
      "contains",
      "notcontains",
      "startswith",
      "endswith",
      "any",
    ];

    if (funcStyle.includes(operator)) {
      if (Array.isArray(value)) {
        return `${operator}(${field},${value.map(FilterSerializer.quote).join(",")})`;
      }
      return `${operator}(${field},${FilterSerializer.quote(value)})`;
    }

    if (!Array.isArray(value)) {

      switch (operator) {
        case "=":
          return `equals(${field},${FilterSerializer.quote(value)})`;
        case ">":
          return `greaterThan(${field},${FilterSerializer.quote(value)})`;
        case ">=":
          return `greaterOrEqual(${field},${FilterSerializer.quote(value)})`;
        case "<":
          return `lessThan(${field},${FilterSerializer.quote(value)})`;
        case "<=":
          return `lessOrEqual(${field},${FilterSerializer.quote(value)})`;
      }

      return `${field}${operator}${FilterSerializer.quote(value)}`;
    }
    return '';
  }

  private static quote(val: Value): string {
    if (val === null || val === undefined) return "null";
    return `'${encodeURIComponent(val)}'`;
  }
}

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

export type Filter = Condition | NotCondition | LogicalCondition;

interface Condition {
  field: string;
  operator: Operator;
  value: Value | Values;
}


