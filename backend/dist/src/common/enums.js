"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaCategory = exports.InquiryStatus = exports.PropertyType = exports.ProjectCategory = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["EDITOR"] = "EDITOR";
})(Role || (exports.Role = Role = {}));
var ProjectCategory;
(function (ProjectCategory) {
    ProjectCategory["COMPLETED"] = "COMPLETED";
    ProjectCategory["ONGOING"] = "ONGOING";
    ProjectCategory["UPCOMING"] = "UPCOMING";
})(ProjectCategory || (exports.ProjectCategory = ProjectCategory = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType["RESIDENTIAL_LUXURY"] = "RESIDENTIAL_LUXURY";
    PropertyType["COMMERCIAL_LANDMARK"] = "COMMERCIAL_LANDMARK";
    PropertyType["PLOTTED_DEVELOPMENT"] = "PLOTTED_DEVELOPMENT";
    PropertyType["EXCLUSIVE_VILLAS"] = "EXCLUSIVE_VILLAS";
    PropertyType["INTEGRATED_TOWNSHIP"] = "INTEGRATED_TOWNSHIP";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
var InquiryStatus;
(function (InquiryStatus) {
    InquiryStatus["NEW"] = "NEW";
    InquiryStatus["CONTACTED"] = "CONTACTED";
    InquiryStatus["IN_PROGRESS"] = "IN_PROGRESS";
    InquiryStatus["RESOLVED"] = "RESOLVED";
    InquiryStatus["ARCHIVED"] = "ARCHIVED";
})(InquiryStatus || (exports.InquiryStatus = InquiryStatus = {}));
var MediaCategory;
(function (MediaCategory) {
    MediaCategory["ALL"] = "ALL";
    MediaCategory["PROJECTS"] = "PROJECTS";
    MediaCategory["COMPLETED_DEVELOPMENTS"] = "COMPLETED_DEVELOPMENTS";
    MediaCategory["CONSTRUCTION_PROGRESS"] = "CONSTRUCTION_PROGRESS";
    MediaCategory["CORPORATE_EVENTS"] = "CORPORATE_EVENTS";
    MediaCategory["TEAM_CELEBRATIONS"] = "TEAM_CELEBRATIONS";
    MediaCategory["OFFICE_BRANCHES"] = "OFFICE_BRANCHES";
    MediaCategory["AWARDS_RECOGNITION"] = "AWARDS_RECOGNITION";
})(MediaCategory || (exports.MediaCategory = MediaCategory = {}));
//# sourceMappingURL=enums.js.map