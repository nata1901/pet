import { useParams } from "react-router-dom";

//Этот компонет будет использоваться сразу в трех местах, то в зависимости от некоторых
//пропсов мы можем т.о модифицировать наш элемент и предоставить разные ситуативные варианты
export function Products ({
isFav = false,
isCat = false
}) {
    const { name } = useParams()
    return <>
    {isFav && <h1>Любимые товары</h1>}
    {isCat && <h1>Страница категории "{name}"</h1>}
    {!isFav && !isCat && <h1>Страница товаров</h1>}
    </>
}
