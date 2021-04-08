import Style from "../userPage/FavoriteUserItem.module.css";

export const highlightGrey = (e) => {
    let eTargetParent = e.target.closest('.' + Style.item)
    if (e.target.classList.contains(Style.item)) e.target.style.backgroundColor = '#eeeeee';
    if (eTargetParent) eTargetParent.style.backgroundColor = '#eeeeee';
}

export const highlightWhite = (e) => {
    let eTargetParent = e.target.closest('.' + Style.item)
    if (e.target.classList.contains(Style.item)) e.target.style.backgroundColor = '#ffffff';
    if (eTargetParent) eTargetParent.style.backgroundColor = '#ffffff';
}