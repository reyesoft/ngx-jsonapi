export class FilterSerializer {
  static serialize(filter: Filter): string {
    if ("and" in filter) {
      return `and(${filter.and.map(FilterSerializer.serialize).join(",")})`;
    }

    if ("or" in filter) {
      return `or(${filter.or.map(FilterSerializer.serialize).join(",")})`;
    }

    if ("not" in filter) {
      return `!${FilterSerializer.serialize(filter.not)}`;
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
      return `${field}${operator}${FilterSerializer.quote(value)}`;
    }
    return '';
  }

  private static quote(val: Value): string {
    if (val === null || val === undefined) return "null";
    if (typeof val === "string") return `'${val}'`;
    return val.toString();
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

type Filter = Condition | NotCondition | LogicalCondition;

interface Condition {
  field: string;
  operator: Operator;
  value: Value | Values;
}


