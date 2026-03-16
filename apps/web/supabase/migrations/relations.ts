import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	identitiesInAuth: {
		usersInAuth: r.one.usersInAuth({
			from: r.identitiesInAuth.userId,
			to: r.usersInAuth.id
		}),
	},
	usersInAuth: {
		identitiesInAuths: r.many.identitiesInAuth(),
		mfaFactorsInAuths: r.many.mfaFactorsInAuth(),
		oauthClientsInAuthsViaOauthAuthorizationsInAuth: r.many.oauthClientsInAuth({
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_oauthAuthorizationsInAuth"
		}),
		oauthClientsInAuthsViaOauthConsentsInAuth: r.many.oauthClientsInAuth({
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_oauthConsentsInAuth"
		}),
		oneTimeTokensInAuths: r.many.oneTimeTokensInAuth(),
		oauthClientsInAuthsViaSessionsInAuth: r.many.oauthClientsInAuth({
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_sessionsInAuth"
		}),
		users: r.many.user(),
	},
	mfaAmrClaimsInAuth: {
		sessionsInAuth: r.one.sessionsInAuth({
			from: r.mfaAmrClaimsInAuth.sessionId,
			to: r.sessionsInAuth.id
		}),
	},
	sessionsInAuth: {
		mfaAmrClaimsInAuths: r.many.mfaAmrClaimsInAuth(),
		refreshTokensInAuths: r.many.refreshTokensInAuth(),
	},
	mfaChallengesInAuth: {
		mfaFactorsInAuth: r.one.mfaFactorsInAuth({
			from: r.mfaChallengesInAuth.factorId,
			to: r.mfaFactorsInAuth.id
		}),
	},
	mfaFactorsInAuth: {
		mfaChallengesInAuths: r.many.mfaChallengesInAuth(),
		usersInAuth: r.one.usersInAuth({
			from: r.mfaFactorsInAuth.userId,
			to: r.usersInAuth.id
		}),
	},
	oauthClientsInAuth: {
		usersInAuthsViaOauthAuthorizationsInAuth: r.many.usersInAuth({
			from: r.oauthClientsInAuth.id.through(r.oauthAuthorizationsInAuth.clientId),
			to: r.usersInAuth.id.through(r.oauthAuthorizationsInAuth.userId),
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_oauthAuthorizationsInAuth"
		}),
		usersInAuthsViaOauthConsentsInAuth: r.many.usersInAuth({
			from: r.oauthClientsInAuth.id.through(r.oauthConsentsInAuth.clientId),
			to: r.usersInAuth.id.through(r.oauthConsentsInAuth.userId),
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_oauthConsentsInAuth"
		}),
		usersInAuthsViaSessionsInAuth: r.many.usersInAuth({
			from: r.oauthClientsInAuth.id.through(r.sessionsInAuth.oauthClientId),
			to: r.usersInAuth.id.through(r.sessionsInAuth.userId),
			alias: "oauthClientsInAuth_id_usersInAuth_id_via_sessionsInAuth"
		}),
	},
	oneTimeTokensInAuth: {
		usersInAuth: r.one.usersInAuth({
			from: r.oneTimeTokensInAuth.userId,
			to: r.usersInAuth.id
		}),
	},
	refreshTokensInAuth: {
		sessionsInAuth: r.one.sessionsInAuth({
			from: r.refreshTokensInAuth.sessionId,
			to: r.sessionsInAuth.id
		}),
	},
	samlProvidersInAuth: {
		ssoProvidersInAuth: r.one.ssoProvidersInAuth({
			from: r.samlProvidersInAuth.ssoProviderId,
			to: r.ssoProvidersInAuth.id
		}),
	},
	ssoProvidersInAuth: {
		samlProvidersInAuths: r.many.samlProvidersInAuth(),
		flowStateInAuths: r.many.flowStateInAuth(),
		ssoDomainsInAuths: r.many.ssoDomainsInAuth(),
	},
	flowStateInAuth: {
		ssoProvidersInAuths: r.many.ssoProvidersInAuth({
			from: r.flowStateInAuth.id.through(r.samlRelayStatesInAuth.flowStateId),
			to: r.ssoProvidersInAuth.id.through(r.samlRelayStatesInAuth.ssoProviderId)
		}),
	},
	ssoDomainsInAuth: {
		ssoProvidersInAuth: r.one.ssoProvidersInAuth({
			from: r.ssoDomainsInAuth.ssoProviderId,
			to: r.ssoProvidersInAuth.id
		}),
	},
	dietProfile: {
		user: r.one.user({
			from: r.dietProfile.userId,
			to: r.user.id
		}),
	},
	user: {
		dietProfiles: r.many.dietProfile(),
		dishes: r.many.dish(),
		usersInAuth: r.one.usersInAuth({
			from: r.user.id,
			to: r.usersInAuth.id
		}),
	},
	component: {
		dishes: r.many.dish({
			from: r.component.id.through(r.dishComponentMap.componentId),
			to: r.dish.id.through(r.dishComponentMap.dishId)
		}),
	},
	dish: {
		components: r.many.component(),
		users: r.many.user({
			from: r.dish.id.through(r.mealHistory.dishId),
			to: r.user.id.through(r.mealHistory.userId)
		}),
	},
	restaurant: {
		restaurantTypes: r.many.restaurantType({
			from: r.restaurant.id.through(r.restaurantTypeMap.resId),
			to: r.restaurantType.id.through(r.restaurantTypeMap.typeId)
		}),
	},
	restaurantType: {
		restaurants: r.many.restaurant(),
	},
	objectsInStorage: {
		bucketsInStorage: r.one.bucketsInStorage({
			from: r.objectsInStorage.bucketId,
			to: r.bucketsInStorage.id
		}),
	},
	bucketsInStorage: {
		objectsInStorages: r.many.objectsInStorage(),
		s3MultipartUploadsInStoragesBucketId: r.many.s3MultipartUploadsInStorage({
			alias: "s3MultipartUploadsInStorage_bucketId_bucketsInStorage_id"
		}),
		s3MultipartUploadsInStoragesViaS3MultipartUploadsPartsInStorage: r.many.s3MultipartUploadsInStorage({
			from: r.bucketsInStorage.id.through(r.s3MultipartUploadsPartsInStorage.bucketId),
			to: r.s3MultipartUploadsInStorage.id.through(r.s3MultipartUploadsPartsInStorage.uploadId),
			alias: "bucketsInStorage_id_s3MultipartUploadsInStorage_id_via_s3MultipartUploadsPartsInStorage"
		}),
	},
	s3MultipartUploadsInStorage: {
		bucketsInStorage: r.one.bucketsInStorage({
			from: r.s3MultipartUploadsInStorage.bucketId,
			to: r.bucketsInStorage.id,
			alias: "s3MultipartUploadsInStorage_bucketId_bucketsInStorage_id"
		}),
		bucketsInStorages: r.many.bucketsInStorage({
			alias: "bucketsInStorage_id_s3MultipartUploadsInStorage_id_via_s3MultipartUploadsPartsInStorage"
		}),
	},
	vectorIndexesInStorage: {
		bucketsVectorsInStorage: r.one.bucketsVectorsInStorage({
			from: r.vectorIndexesInStorage.bucketId,
			to: r.bucketsVectorsInStorage.id
		}),
	},
	bucketsVectorsInStorage: {
		vectorIndexesInStorages: r.many.vectorIndexesInStorage(),
	},
}))