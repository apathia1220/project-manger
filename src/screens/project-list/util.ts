import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useAsync } from "utils/use-async";
import { useHttp } from '../../utils/http'
import { Project } from "./list";

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);

    return [
        useMemo(
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const;
};

export const useEditProject = () => {
    const client = useHttp();
    const { run, ...res } = useAsync();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            })
        );
    };

    return {
        mutate,
        ...res
    };
}

export const useAddProject = () => {
    const client = useHttp();
    const { run, ...res } = useAsync();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "POST",
            })
        );
    };

    return {
        mutate,
        ...res
    };
}